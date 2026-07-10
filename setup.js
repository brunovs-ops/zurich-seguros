// Setup do banco: cria o schema e popula a tabela aparelhos com o catálogo.
// Uso: npm run db:setup (requer DATABASE_URL). No Railway, rodar uma vez após o deploy.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { pool, hasDatabase } from "./pool.js";
import { APARELHOS } from "./catalogo.data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function setup() {
  if (!hasDatabase) {
    console.error("DATABASE_URL não definida. Configure o Postgres antes de rodar o setup.");
    process.exit(1);
  }

  const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
  console.log("Criando schema...");
  await pool.query(schema);

  console.log(`Inserindo ${APARELHOS.length} aparelhos...`);
  for (const a of APARELHOS) {
    await pool.query(
      `INSERT INTO aparelhos (tipo, fabricante, modelo, variante, valor_aparelho)
       VALUES ($1, $2, $3, $4, $5)`,
      [a.tipo, a.fabricante, a.modelo, a.variante, a.valorAparelho]
    );
  }

  const { rows } = await pool.query("SELECT COUNT(*)::int AS total FROM aparelhos");
  console.log(`Setup concluído. Total de aparelhos: ${rows[0].total}`);
  await pool.end();
}

setup().catch((err) => {
  console.error("Erro no setup:", err);
  process.exit(1);
});
