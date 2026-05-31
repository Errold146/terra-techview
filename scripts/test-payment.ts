/**
 * Script de diagnóstico: verifica el estado de la DB y de Stripe.
 *
 * Uso:
 *   npx tsx scripts/test-payment.ts
 *
 * Opcionalmente, para forzar el update de un usuario:
 *   npx tsx scripts/test-payment.ts --force-update <userId> <plan>
 *   Ejemplo: npx tsx scripts/test-payment.ts --force-update user_abc123 pro
 */

import "dotenv/config";
import { Pool, neonConfig } from "@neondatabase/serverless";
import Stripe from "stripe";

neonConfig.webSocketConstructor = globalThis.WebSocket;

const DATABASE_URL = process.env.DATABASE_URL!;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;

if (!DATABASE_URL) {
    console.error("❌  DATABASE_URL no definida en .env");
    process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });
const stripe = new Stripe(STRIPE_SECRET_KEY);

const args = process.argv.slice(2);
const forceUpdate = args[0] === "--force-update";
const targetUserId = args[1];
const targetPlan = args[2];

async function run() {
    console.log("\n========== DIAGNÓSTICO DE PAGOS ==========\n");

    // ── 1. Conexión a DB ────────────────────────────────────────────────────
    console.log("🔌  Verificando conexión a la base de datos...");
    try {
        await pool.query("SELECT 1");
        console.log("✅  Conexión OK\n");
    } catch (err) {
        console.error("❌  No se pudo conectar a la DB:", err);
        process.exit(1);
    }

    // ── 2. Usuarios en la DB ────────────────────────────────────────────────
    console.log("👤  Usuarios en la DB:");
    const usersResult = await pool.query(
        'SELECT id, email, plan, "hasPaid", "paidAt", "canceledAt", "stripeCustomerId", "stripeSubscriptionId", "createdAt" FROM "User" ORDER BY "createdAt" DESC LIMIT 10'
    );
    if (usersResult.rows.length === 0) {
        console.log("   (ninguno — el usuario no ha creado ninguna entrevista todavía)\n");
    } else {
        for (const u of usersResult.rows) {
            console.log(`   ID:           ${u.id}`);
            console.log(`   Email:        ${u.email ?? "(sin email)"}`);
            console.log(`   Plan:         ${u.plan}`);
            console.log(`   hasPaid:      ${u.hasPaid}`);
            console.log(`   paidAt:       ${u.paidAt ?? "—"}`);
            console.log(`   canceledAt:   ${u.canceledAt ?? "—"}`);
            console.log(`   stripeCustomer: ${u.stripeCustomerId ?? "—"}`);
            console.log(`   stripeSub:    ${u.stripeSubscriptionId ?? "—"}`);
            console.log("   ---");
        }
        console.log();
    }

    // ── 3. Pagos en la DB ───────────────────────────────────────────────────
    console.log("💳  Pagos registrados en la DB:");
    const paymentsResult = await pool.query(
        'SELECT id, "userId", plan, amount, status, "stripeSessionId", "createdAt" FROM "Payment" ORDER BY "createdAt" DESC LIMIT 10'
    );
    if (paymentsResult.rows.length === 0) {
        console.log("   (ninguno)\n");
    } else {
        for (const p of paymentsResult.rows) {
            console.log(`   ID:         ${p.id}`);
            console.log(`   userId:     ${p.userId}`);
            console.log(`   plan:       ${p.plan}`);
            console.log(`   amount:     $${p.amount}`);
            console.log(`   status:     ${p.status}`);
            console.log(`   sessionId:  ${p.stripeSessionId ?? "—"}`);
            console.log(`   createdAt:  ${p.createdAt}`);
            console.log("   ---");
        }
        console.log();
    }

    // ── 4. Últimas sesiones de Stripe ───────────────────────────────────────
    console.log("🏦  Últimas sesiones de Stripe Checkout:");
    const sessions = await stripe.checkout.sessions.list({ limit: 5 });
    for (const s of sessions.data) {
        console.log(`   ID:           ${s.id}`);
        console.log(`   status:       ${s.status}`);
        console.log(`   payment_status: ${s.payment_status}`);
        console.log(`   metadata:     ${JSON.stringify(s.metadata)}`);
        console.log(`   amount_total: ${s.amount_total ? s.amount_total / 100 : 0} USD`);
        console.log(`   created:      ${new Date(s.created * 1000).toISOString()}`);
        console.log("   ---");
    }
    console.log();

    // ── 5. Forzar update (opcional) ─────────────────────────────────────────
    if (forceUpdate && targetUserId && targetPlan) {
        if (targetPlan !== "pro" && targetPlan !== "premium" && targetPlan !== "free") {
            console.error(`❌  Plan inválido: "${targetPlan}". Usa: free | pro | premium`);
            process.exit(1);
        }

        console.log(`\n🔧  Forzando update de usuario "${targetUserId}" a plan "${targetPlan}"...`);

        // Upsert: si el usuario no existe, lo crea
        const existing = await pool.query('SELECT id FROM "User" WHERE id = $1', [targetUserId]);
        if (existing.rows.length === 0) {
            await pool.query(
                `INSERT INTO "User" (id, plan, "hasPaid", "paidAt") VALUES ($1, $2::\"Plan\", $3, $4)`,
                [targetUserId, targetPlan, targetPlan !== "free", targetPlan !== "free" ? new Date().toISOString() : null]
            );
            console.log("✅  Usuario CREADO con el plan.");
        } else {
            await pool.query(
                `UPDATE "User" SET plan = $2::\"Plan\", "hasPaid" = $3, "paidAt" = $4 WHERE id = $1`,
                [targetUserId, targetPlan, targetPlan !== "free", targetPlan !== "free" ? new Date().toISOString() : null]
            );
            console.log("✅  Usuario ACTUALIZADO.");
        }

        // Verificar
        const updated = await pool.query('SELECT id, plan, "hasPaid" FROM "User" WHERE id = $1', [targetUserId]);
        console.log("   Resultado:", updated.rows[0]);
    }

    console.log("\n==========================================\n");
    await pool.end();
}

run().catch((err) => {
    console.error("❌  Error fatal:", err);
    process.exit(1);
});
