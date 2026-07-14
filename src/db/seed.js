// Popula a tabela aparelhos com o catalogo expandido.
// Roda automaticamente no start se SEED_ON_BOOT=true, ou manual via `npm run seed`.
import { pool, hasDatabase } from "./pool.js";

const APARELHOS_SEED = [
  // Apple - iPhones
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Pro Max", variante: "1TB", valor: 17999 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Pro Max", variante: "512GB", valor: 15999 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Pro Max", variante: "256GB", valor: 13999 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Pro", variante: "512GB", valor: 12999 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Pro", variante: "256GB", valor: 10999 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17", variante: "512GB", valor: 9499 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17", variante: "256GB", valor: 8499 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17", variante: "128GB", valor: 7499 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Air", variante: "256GB", valor: 9999 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Air", variante: "128GB", valor: 8799 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 16 Pro Max", variante: "256GB", valor: 10999 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 16 Pro", variante: "256GB", valor: 8999 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 16", variante: "128GB", valor: 6499 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 15", variante: "128GB", valor: 5299 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 14", variante: "128GB", valor: 4299 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 13", variante: "128GB", valor: 3599 },

  // Samsung - Galaxy
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25 Ultra", variante: "1TB", valor: 12999 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25 Ultra", variante: "512GB", valor: 10999 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25 Ultra", variante: "256GB", valor: 8999 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25", variante: "512GB", valor: 7999 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25", variante: "256GB", valor: 6999 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25", variante: "128GB", valor: 5999 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S24 Ultra", variante: "512GB", valor: 8999 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S24 Ultra", variante: "256GB", valor: 7499 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S24", variante: "256GB", valor: 5499 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy Z Fold 5", variante: "512GB", valor: 11499 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy Z Flip 5", variante: "256GB", valor: 6499 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy A55", variante: "128GB", valor: 2299 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy A35", variante: "128GB", valor: 1799 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy A15", variante: "128GB", valor: 1299 },

  // Motorola
  { tipo: "celular", fabricante: "Motorola", modelo: "Edge 50 Ultra", variante: "512GB", valor: 4999 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Edge 50 Pro", variante: "256GB", valor: 3499 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Edge 50", variante: "256GB", valor: 2799 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Moto G85", variante: "256GB", valor: 1899 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Moto G84", variante: "256GB", valor: 1599 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Moto G34", variante: "128GB", valor: 999 },

  // Xiaomi
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Xiaomi 14 Ultra", variante: "512GB", valor: 6999 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Xiaomi 14", variante: "256GB", valor: 4499 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Redmi Note 13 Pro Plus", variante: "256GB", valor: 2499 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Redmi Note 13 Pro", variante: "256GB", valor: 1799 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Redmi Note 13", variante: "128GB", valor: 1399 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "POCO X6 Pro", variante: "256GB", valor: 1999 },

  // Garmin - Smartwatches
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Fenix 8", variante: "51mm", valor: 8999 },
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Fenix 7", variante: "47mm", valor: 6499 },
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Epix Pro Gen 2", variante: "47mm", valor: 7999 },
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Forerunner 965", variante: "47mm", valor: 5499 },
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Forerunner 265", variante: "46mm", valor: 3999 },
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Venu 3", variante: "45mm", valor: 3499 },
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Vivoactive 5", variante: "42mm", valor: 2299 },

  // Apple Watch
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch Ultra 2", variante: "49mm", valor: 7999 },
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch Series 10", variante: "46mm", valor: 4999 },
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch Series 10", variante: "42mm", valor: 4499 },
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch SE", variante: "44mm", valor: 2999 },

  // Samsung Watch
  { tipo: "smartwatch", fabricante: "Samsung", modelo: "Galaxy Watch Ultra", variante: "47mm", valor: 5999 },
  { tipo: "smartwatch", fabricante: "Samsung", modelo: "Galaxy Watch 7", variante: "44mm", valor: 3499 },
  { tipo: "smartwatch", fabricante: "Samsung", modelo: "Galaxy Watch 7", variante: "40mm", valor: 2999 }
];

export async function runSeed() {
  if (!hasDatabase) {
    console.log("[SEED] DATABASE_URL ausente, seed ignorado");
    return;
  }

  console.log("[SEED] iniciando seed do catalogo");

  // Garante que a tabela existe
  await pool.query(`
    CREATE TABLE IF NOT EXISTS aparelhos (
      id SERIAL PRIMARY KEY,
      tipo TEXT NOT NULL,
      fabricante TEXT NOT NULL,
      modelo TEXT NOT NULL,
      variante TEXT NOT NULL,
      valor_aparelho NUMERIC(10,2) NOT NULL,
      ativo BOOLEAN NOT NULL DEFAULT TRUE
    )
  `);

  // Limpa catalogo atual
  await pool.query("TRUNCATE TABLE aparelhos RESTART IDENTITY CASCADE");
  console.log("[SEED] tabela aparelhos truncada");

  // Insere catalogo expandido
  for (const a of APARELHOS_SEED) {
    await pool.query(
      `INSERT INTO aparelhos (tipo, fabricante, modelo, variante, valor_aparelho, ativo)
       VALUES ($1, $2, $3, $4, $5, TRUE)`,
      [a.tipo, a.fabricante, a.modelo, a.variante, a.valor]
    );
  }

  console.log(`[SEED] ${APARELHOS_SEED.length} aparelhos inseridos`);
}

// Permite rodar manualmente via `node src/db/seed.js`
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("[SEED] erro:", err);
      process.exit(1);
    });
}
