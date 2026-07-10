// Pool de conexão Postgres. No Railway, DATABASE_URL é injetada automaticamente
// ao vincular o plugin Postgres ao serviço.

import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false }
});

// Indica se há banco configurado. Se não houver, o backend usa o catálogo em memória.
export const hasDatabase = Boolean(process.env.DATABASE_URL);
