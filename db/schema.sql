-- Schema da demo Zurich Seguro Celular.
-- Só o catálogo de aparelhos vive no banco. Preço, franquia e prêmio são
-- calculados no backend (src/services/cotacao.js) a partir do valor do aparelho,
-- então não há tabela de preço: evita explosão de linhas por combinação.

DROP TABLE IF EXISTS aparelhos;

CREATE TABLE aparelhos (
  id             SERIAL PRIMARY KEY,
  tipo           TEXT NOT NULL CHECK (tipo IN ('celular', 'smartwatch')),
  fabricante     TEXT NOT NULL,
  modelo         TEXT NOT NULL,
  -- variante: memória para celular (ex.: "256GB"), tamanho da caixa para smartwatch (ex.: "46mm").
  variante       TEXT NOT NULL,
  valor_aparelho NUMERIC(10,2) NOT NULL,
  ativo          BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_aparelhos_tipo ON aparelhos (tipo);
CREATE INDEX idx_aparelhos_tipo_fab ON aparelhos (tipo, fabricante);
