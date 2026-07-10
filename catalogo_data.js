// Catálogo de aparelhos fictícios da demo.
// Fonte única dos dados: usado pelo seed do Postgres e como fallback em memória
// caso o banco não esteja disponível (útil para rodar a demo sem infra).
// valorAparelho em reais. variante = memória (celular) ou tamanho da caixa (smartwatch).

export const APARELHOS = [
  // Apple - celular
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Pro", variante: "256GB", valorAparelho: 11499.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 16", variante: "128GB", valorAparelho: 7799.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 15", variante: "128GB", valorAparelho: 6299.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 14", variante: "128GB", valorAparelho: 4999.00 },

  // Samsung - celular
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25 Ultra", variante: "256GB", valorAparelho: 9999.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S24", variante: "256GB", valorAparelho: 5499.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy A55", variante: "128GB", valorAparelho: 2299.00 },

  // Motorola - celular
  { tipo: "celular", fabricante: "Motorola", modelo: "Edge 50 Pro", variante: "512GB", valorAparelho: 3499.00 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Moto G84", variante: "256GB", valorAparelho: 1899.00 },

  // Xiaomi - celular
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Redmi Note 13 Pro", variante: "256GB", valorAparelho: 2199.00 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Poco X6", variante: "256GB", valorAparelho: 1999.00 },

  // Apple - smartwatch
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch Series 10", variante: "46mm", valorAparelho: 5299.00 },
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch SE", variante: "44mm", valorAparelho: 2999.00 },

  // Samsung - smartwatch
  { tipo: "smartwatch", fabricante: "Samsung", modelo: "Galaxy Watch 7", variante: "44mm", valorAparelho: 2199.00 },

  // Garmin - smartwatch
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Forerunner 265", variante: "46mm", valorAparelho: 3999.00 }
];
