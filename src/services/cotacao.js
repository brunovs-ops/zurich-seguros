// Serviço de cotação. Recebe o valor do aparelho e a combinação escolhida
// (plano, franquia, forma de cobrança) e devolve os valores calculados.
// Não acessa o banco: recebe o valor do aparelho já resolvido pelo chamador.

import { PLANOS, FRANQUIAS, COBRANCAS, BENEFICIOS_GERAIS } from "../config/pricing.js";

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

// Formata número em Real brasileiro (ex.: 157.06 -> "R$ 157,06").
export function formatBRL(n) {
  return "R$ " + round2(n).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Calcula uma cotação única para uma combinação específica.
// valorAparelho: number | planoId, franquiaId, cobrancaId: strings da config.
export function cotar(valorAparelho, planoId, franquiaId, cobrancaId) {
  const plano = PLANOS[planoId];
  const franquia = FRANQUIAS[franquiaId];
  const cobranca = COBRANCAS[cobrancaId];

  if (!plano) throw new Error(`Plano inválido: ${planoId}`);
  if (!franquia) throw new Error(`Franquia inválida: ${franquiaId}`);
  if (!cobranca) throw new Error(`Forma de cobrança inválida: ${cobrancaId}`);

  const valorFranquia = round2(valorAparelho * franquia.percentualValor);
  const premioAnual = round2(
    valorAparelho * plano.taxaAnual * franquia.fatorPremio * cobranca.fatorPremio
  );
  const parcela = round2(premioAnual / cobranca.parcelas);

  return {
    plano: plano.id,
    planoNome: plano.nome,
    recomendado: plano.recomendado,
    coberturas: plano.coberturas,
    franquia: franquia.id,
    franquiaNome: franquia.nome,
    cobranca: cobranca.id,
    cobrancaNome: cobranca.nome,
    valorAparelho: round2(valorAparelho),
    valorFranquia,
    premioAnual,
    parcelas: cobranca.parcelas,
    parcela,
    // Strings prontas para exibição no Flow.
    valorAparelhoBRL: formatBRL(valorAparelho),
    valorFranquiaBRL: formatBRL(valorFranquia),
    parcelaBRL: formatBRL(parcela),
    resumoParcela: `${cobranca.parcelas}x de ${formatBRL(parcela)}${cobranca.semJuros ? " sem juros" : ""}`
  };
}

// Devolve a cotação dos três planos de uma vez, para a tela de seleção do Flow.
// Mantém franquia e cobrança fixas e varia o plano.
export function cotarTodosPlanos(valorAparelho, franquiaId, cobrancaId) {
  return Object.keys(PLANOS).map((planoId) =>
    cotar(valorAparelho, planoId, franquiaId, cobrancaId)
  );
}

export { BENEFICIOS_GERAIS };
