// Backend/cérebro da demo Zurich Seguro Celular.
// Expõe o catálogo e a cotação para a Code Action de endpoint do WhatsApp Flow.
// A CA de endpoint (data_exchange) é quem chama estas rotas e formata para cada tela.

import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
import {
  listarTipos,
  listarFabricantes,
  listarModelos,
  buscarAparelho
} from "./services/catalogo.js";
import {
  cotar,
  cotarTodosPlanos,
  BENEFICIOS_GERAIS
} from "./services/cotacao.js";
import { hasDatabase } from "./db/pool.js";

const app = express();
app.use(express.json());

// Health check.
app.get("/health", (req, res) => {
  res.json({ ok: true, database: hasDatabase ? "postgres" : "memoria" });
});

// WebView de vistoria (simulada). Lê modelo/plano/protocolo via query params.
app.get("/vistoria", (req, res) => {
  res.sendFile(join(__dirname, "public", "vistoria.html"));
});

// Tipos de aparelho (celular, smartwatch).
app.get("/api/tipos", async (req, res, next) => {
  try {
    res.json({ tipos: await listarTipos() });
  } catch (err) {
    next(err);
  }
});

// Fabricantes por tipo. Ex.: GET /api/fabricantes?tipo=celular
app.get("/api/fabricantes", async (req, res, next) => {
  try {
    const { tipo } = req.query;
    if (!tipo) return res.status(400).json({ erro: "tipo é obrigatório" });
    res.json({ tipo, fabricantes: await listarFabricantes(tipo) });
  } catch (err) {
    next(err);
  }
});

// Modelos por tipo + fabricante. Ex.: GET /api/modelos?tipo=celular&fabricante=Apple
app.get("/api/modelos", async (req, res, next) => {
  try {
    const { tipo, fabricante } = req.query;
    if (!tipo || !fabricante) {
      return res.status(400).json({ erro: "tipo e fabricante são obrigatórios" });
    }
    res.json({ tipo, fabricante, modelos: await listarModelos(tipo, fabricante) });
  } catch (err) {
    next(err);
  }
});

// Cotação de todos os planos para um aparelho, com franquia e cobrança fixas.
// Alimenta a tela de seleção de plano do Flow.
// Ex.: GET /api/cotacao?aparelhoId=1&franquia=reduzida&cobranca=anual
app.get("/api/cotacao", async (req, res, next) => {
  try {
    const { aparelhoId, franquia = "reduzida", cobranca = "anual" } = req.query;
    if (!aparelhoId) return res.status(400).json({ erro: "aparelhoId é obrigatório" });

    const aparelho = await buscarAparelho(aparelhoId);
    if (!aparelho) return res.status(404).json({ erro: "aparelho não encontrado" });

    const cotacoes = cotarTodosPlanos(aparelho.valorAparelho, franquia, cobranca);
    res.json({
      aparelho: {
        id: aparelho.id,
        modelo: aparelho.modelo,
        variante: aparelho.variante,
        label: `${aparelho.modelo} ${aparelho.variante}`,
        valorAparelho: aparelho.valorAparelho
      },
      beneficios: BENEFICIOS_GERAIS,
      cotacoes
    });
  } catch (err) {
    next(err);
  }
});

// Cotação de uma combinação única (recálculo em tela do Flow via update_data).
// Ex.: GET /api/cotacao/uma?aparelhoId=1&plano=supercompleto&franquia=reduzida&cobranca=anual
app.get("/api/cotacao/uma", async (req, res, next) => {
  try {
    const { aparelhoId, plano, franquia, cobranca } = req.query;
    if (!aparelhoId || !plano || !franquia || !cobranca) {
      return res.status(400).json({ erro: "aparelhoId, plano, franquia e cobranca são obrigatórios" });
    }
    const aparelho = await buscarAparelho(aparelhoId);
    if (!aparelho) return res.status(404).json({ erro: "aparelho não encontrado" });

    res.json({ cotacao: cotar(aparelho.valorAparelho, plano, franquia, cobranca) });
  } catch (err) {
    next(err);
  }
});

// Middleware de erro.
app.use((err, req, res, next) => {
  console.error("Erro:", err.message);
  res.status(500).json({ erro: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Zurich Seguro MCP rodando na porta ${PORT} (db: ${hasDatabase ? "postgres" : "memoria"})`);
});

export default app;
