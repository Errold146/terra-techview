/**
 * Simula directamente la lógica de verify-session con la última sesión real de Stripe.
 * Uso: npx tsx scripts/sync-payment.ts
 */

import "dotenv/config";
import Stripe from "stripe";
import { Pool, neonConfig } from "@neondatabase/serverless";

neonConfig.webSocketConstructor = globalThis.WebSocket;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

async function run() {
    // Tomar las últimas sesiones completadas
    const sessions = await stripe.checkout.sessions.list({ limit: 10 });
    const completed = sessions.data.filter(
        (s) => s.status === "complete" && s.payment_status === "paid" && s.metadata?.userId
    );

    if (completed.length === 0) {
        console.log("❌  No hay sesiones completadas con userId.");
        return;
    }

    console.log(`✅  Encontradas ${completed.length} sesiones completadas. Procesando...`);

    for (const session of completed) {
        const userId = session.metadata!.userId;
        const plan = session.metadata!.plan;

        if (!plan || (plan !== "pro" && plan !== "premium")) {
            console.log(`⚠️  Sesión ${session.id} tiene plan inválido: "${plan}". Saltando.`);
            continue;
        }

        console.log(`\n🔄  Procesando sesión ${session.id}`);
        console.log(`    userId: ${userId}, plan: ${plan}`);

        // Verificar si ya existe un Payment para esta sesión
        const existingPayment = await pool.query(
            `SELECT id FROM "Payment" WHERE "stripeSessionId" = $1`,
            [session.id]
        );

        if (existingPayment.rows.length > 0) {
            console.log("    ⏭️  Ya procesada, saltando.");
            continue;
        }

        // Upsert del usuario
        const existingUser = await pool.query(`SELECT id FROM "User" WHERE id = $1`, [userId]);

        if (existingUser.rows.length === 0) {
            await pool.query(
                `INSERT INTO "User" (id, plan, "hasPaid", "paidAt", "stripeCustomerId", "stripeSubscriptionId")
                 VALUES ($1, $2::"Plan", true, NOW(), $3, $4)`,
                [userId, plan, session.customer, session.subscription]
            );
            console.log("    ✅  Usuario CREADO con plan.");
        } else {
            await pool.query(
                `UPDATE "User"
                 SET plan = $2::"Plan", "hasPaid" = true, "paidAt" = NOW(), "canceledAt" = NULL,
                     "stripeCustomerId" = $3, "stripeSubscriptionId" = $4
                 WHERE id = $1`,
                [userId, plan, session.customer, session.subscription]
            );
            console.log("    ✅  Usuario ACTUALIZADO.");
        }

        // Crear el registro de Payment
        await pool.query(
            `INSERT INTO "Payment" (id, "userId", plan, amount, "stripeSessionId", "stripeSubscriptionId", status)
             VALUES (gen_random_uuid()::text, $1, $2::"Plan", $3, $4, $5, 'active')`,
            [
                userId,
                plan,
                (session.amount_total ?? 0) / 100,
                session.id,
                session.subscription,
            ]
        );
        console.log("    ✅  Payment CREADO.");
    }

    // Mostrar resultado final
    console.log("\n📊  Estado final en la DB:");
    const users = await pool.query(
        `SELECT id, plan, "hasPaid", "stripeCustomerId" FROM "User" WHERE "hasPaid" = true`
    );
    for (const u of users.rows) {
        console.log(`    ${u.id} → plan: ${u.plan}, hasPaid: ${u.hasPaid}`);
    }

    const payments = await pool.query(`SELECT "userId", plan, amount, status FROM "Payment"`);
    console.log(`\n    Pagos registrados: ${payments.rows.length}`);
    for (const p of payments.rows) {
        console.log(`    ${p.userId} → ${p.plan} $${p.amount} [${p.status}]`);
    }

    await pool.end();
    console.log("\n✅  Sync completado.");
}

run().catch((err) => {
    console.error("❌  Error:", err);
    process.exit(1);
});
