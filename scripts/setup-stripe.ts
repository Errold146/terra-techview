import Stripe from "stripe";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Cargar solo .env (sin .env.local) para usar las claves reales
dotenv.config({ path: path.join(process.cwd(), ".env") });

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey || secretKey.startsWith("sk_test_...")) {
    console.error("❌ STRIPE_SECRET_KEY no está configurada en .env");
    process.exit(1);
}

const stripe = new Stripe(secretKey);

async function main() {
    console.log("🔧 Creando productos y precios en Stripe...\n");

    // Pro - $10/mes
    const proProduct = await stripe.products.create({
        name: "TechView Pro",
        description: "Full access to all Pro features",
    });
    const proPrice = await stripe.prices.create({
        product: proProduct.id,
        unit_amount: 1000,
        currency: "usd",
        recurring: { interval: "month" },
    });
    console.log(`✓ Pro Price ID:     ${proPrice.id}`);

    // Premium - $20/mes
    const premiumProduct = await stripe.products.create({
        name: "TechView Premium",
        description: "Unlimited access and exclusive Premium features",
    });
    const premiumPrice = await stripe.prices.create({
        product: premiumProduct.id,
        unit_amount: 2000,
        currency: "usd",
        recurring: { interval: "month" },
    });
    console.log(`✓ Premium Price ID: ${premiumPrice.id}`);

    // Actualizar .env.local con los price IDs reales
    const envLocalPath = path.join(process.cwd(), ".env.local");

    let lines: string[] = [];
    if (fs.existsSync(envLocalPath)) {
        lines = fs.readFileSync(envLocalPath, "utf-8").split("\n");
    }

    // Filtrar líneas que vamos a reemplazar
    const keysToRemove = [
        "STRIPE_SECRET_KEY",
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
        "STRIPE_WEBHOOK_SECRET",
        "STRIPE_PRO_PRICE_ID",
        "STRIPE_PREMIUM_PRICE_ID",
    ];
    lines = lines.filter(
        (line) => !keysToRemove.some((k) => line.startsWith(k))
    );

    // Agregar los price IDs reales
    lines.push(`STRIPE_PRO_PRICE_ID=${proPrice.id}`);
    lines.push(`STRIPE_PREMIUM_PRICE_ID=${premiumPrice.id}`);

    // Limpiar líneas vacías duplicadas al final
    while (lines.at(-1) === "") lines.pop();
    lines.push("");

    fs.writeFileSync(envLocalPath, lines.join("\n"));

    console.log("\n✅ .env.local actualizado con los Price IDs reales.");
    console.log("👉 Reinicia el servidor de desarrollo para aplicar los cambios.\n");
}

main().catch((err) => {
    console.error("❌ Error:", err.message);
    process.exit(1);
});
