// Configuração de precificação da demo Zurich Seguro Celular.
// Toda a lógica de preço vive aqui, derivada dos prints reais da jornada Zurich.
// Ajuste os fatores neste arquivo para calibrar a demo sem mexer no restante do código.

// Planos e coberturas. taxaAnual = percentual do valor do aparelho cobrado por ano (franquia Reduzida, cobrança Anual).
// Referência do print: Supercompleto = 16,39% do valor -> iPhone 17 Pro 256GB (R$ 11.499) = R$ 1.884,68/ano = R$ 157,06 em 12x.
export const PLANOS = {
  economico: {
    id: "economico",
    nome: "Econômico",
    taxaAnual: 0.09,
    recomendado: false,
    coberturas: [
      "Roubo",
      "Furto Simples e Qualificado"
    ]
  },
  completo: {
    id: "completo",
    nome: "Completo",
    taxaAnual: 0.125,
    recomendado: false,
    coberturas: [
      "Roubo",
      "Furto Simples e Qualificado",
      "Danos Acidentais por Queda e Líquido"
    ]
  },
  supercompleto: {
    id: "supercompleto",
    nome: "Supercompleto",
    taxaAnual: 0.1639,
    recomendado: true,
    coberturas: [
      "Roubo",
      "Furto Simples e Qualificado",
      "Danos Acidentais por Queda e Líquido",
      "Transações Digitais e Pix"
    ]
  }
};

// Franquia = percentual do valor do aparelho, pago pelo segurado no acionamento.
// Print: Reduzida 25% (R$ 2.874,75) e Normal 40% (R$ 4.599,60) para o iPhone 17 Pro 256GB.
// fatorPremio: franquia maior barateia a mensalidade (o segurado assume mais no sinistro).
export const FRANQUIAS = {
  reduzida: { id: "reduzida", nome: "Reduzida", percentualValor: 0.25, fatorPremio: 1.0 },
  normal: { id: "normal", nome: "Normal", percentualValor: 0.40, fatorPremio: 0.82 }
};

// Forma de cobrança. Anual é pago em 12x sem juros. Mensal tem leve acréscimo.
export const COBRANCAS = {
  anual: { id: "anual", nome: "Anual", fatorPremio: 1.0, parcelas: 12, semJuros: true },
  mensal: { id: "mensal", nome: "Mensal", fatorPremio: 1.06, parcelas: 12, semJuros: false }
};

// Benefícios exibidos em todos os planos (coluna do meio do print).
export const BENEFICIOS_GERAIS = [
  "Cobertura internacional",
  "Análise, aprovação e proteção imediata",
  "Atendimento 24 horas"
];
