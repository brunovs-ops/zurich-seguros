// Serviço de catálogo. Consulta fabricantes e modelos por tipo de aparelho.
// Usa Postgres se DATABASE_URL estiver definida; senão, usa o catálogo em memória.

import { pool, hasDatabase } from "../db/pool.js";
import { APARELHOS } from "../db/catalogo.data.js";

// Lista os tipos disponíveis (celular, smartwatch).
export async function listarTipos() {
  if (!hasDatabase) {
    return [...new Set(APARELHOS.map((a) => a.tipo))];
  }
  const { rows } = await pool.query(
    "SELECT DISTINCT tipo FROM aparelhos WHERE ativo = TRUE ORDER BY tipo"
  );
  return rows.map((r) => r.tipo);
}

// Lista fabricantes de um tipo (ex.: tipo=celular -> Apple, Samsung...).
export async function listarFabricantes(tipo) {
  if (!hasDatabase) {
    return [...new Set(APARELHOS.filter((a) => a.tipo === tipo).map((a) => a.fabricante))];
  }
  const { rows } = await pool.query(
    "SELECT DISTINCT fabricante FROM aparelhos WHERE tipo = $1 AND ativo = TRUE ORDER BY fabricante",
    [tipo]
  );
  return rows.map((r) => r.fabricante);
}

// Lista modelos de um fabricante dentro de um tipo. Retorna id, rótulo e valor.
export async function listarModelos(tipo, fabricante) {
  if (!hasDatabase) {
    return APARELHOS
      .filter((a) => a.tipo === tipo && a.fabricante === fabricante)
      .map((a, i) => montarModelo({ ...a, id: `${fabricante}-${i}` }));
  }
  const { rows } = await pool.query(
    `SELECT id, modelo, variante, valor_aparelho
       FROM aparelhos
      WHERE tipo = $1 AND fabricante = $2 AND ativo = TRUE
      ORDER BY valor_aparelho DESC`,
    [tipo, fabricante]
  );
  return rows.map((r) =>
    montarModelo({
      id: String(r.id),
      modelo: r.modelo,
      variante: r.variante,
      valorAparelho: Number(r.valor_aparelho)
    })
  );
}

// Busca um aparelho por id (retorna valor para a cotação).
export async function buscarAparelho(id) {
  if (!hasDatabase) {
    // Em memória, o id é fabricante-índice; reconstrói a busca.
    const [fabricante, idx] = String(id).split("-");
    const lista = APARELHOS.filter((a) => a.fabricante === fabricante);
    const a = lista[Number(idx)];
    return a ? { ...a, id } : null;
  }
  const { rows } = await pool.query(
    "SELECT id, tipo, fabricante, modelo, variante, valor_aparelho FROM aparelhos WHERE id = $1",
    [id]
  );
  if (!rows[0]) return null;
  const r = rows[0];
  return {
    id: String(r.id),
    tipo: r.tipo,
    fabricante: r.fabricante,
    modelo: r.modelo,
    variante: r.variante,
    valorAparelho: Number(r.valor_aparelho)
  };
}

function montarModelo(a) {
  return {
    id: String(a.id),
    modelo: a.modelo,
    variante: a.variante,
    valorAparelho: a.valorAparelho,
    // Rótulo pronto para o dropdown do Flow (ex.: "iPhone 17 Pro 256GB").
    label: `${a.modelo} ${a.variante}`
  };
}
