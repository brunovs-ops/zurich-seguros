// Catálogo de aparelhos da demo.
// Fonte única dos dados: usado pelo seed do Postgres e como fallback em memória.
// valorAparelho em reais. variante = memória (celular) ou tamanho da caixa (smartwatch).
// Catálogo ampliado por fabricante para a tela de seleção (Dropdown com busca).

export const APARELHOS = [
  // ===================== CELULAR =====================

  // Apple
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Pro Max", variante: "512GB", valorAparelho: 13999.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17 Pro", variante: "256GB", valorAparelho: 11499.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17", variante: "256GB", valorAparelho: 8999.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 17e", variante: "128GB", valorAparelho: 6499.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone Air", variante: "256GB", valorAparelho: 9999.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 16 Pro Max", variante: "256GB", valorAparelho: 10999.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 16", variante: "128GB", valorAparelho: 7799.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 15", variante: "128GB", valorAparelho: 6299.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 14", variante: "128GB", valorAparelho: 4999.00 },
  { tipo: "celular", fabricante: "Apple", modelo: "iPhone 13", variante: "128GB", valorAparelho: 3999.00 },

  // Samsung
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25 Ultra", variante: "512GB", valorAparelho: 10999.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S25", variante: "256GB", valorAparelho: 6999.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S24 Ultra", variante: "256GB", valorAparelho: 7999.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy S24", variante: "256GB", valorAparelho: 5499.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy Z Flip 5", variante: "256GB", valorAparelho: 6499.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy Z Fold 5", variante: "512GB", valorAparelho: 11499.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy A55", variante: "128GB", valorAparelho: 2299.00 },
  { tipo: "celular", fabricante: "Samsung", modelo: "Galaxy A35", variante: "128GB", valorAparelho: 1799.00 },

  // Motorola
  { tipo: "celular", fabricante: "Motorola", modelo: "Edge 50 Ultra", variante: "512GB", valorAparelho: 4499.00 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Edge 50 Pro", variante: "512GB", valorAparelho: 3499.00 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Edge 50 Fusion", variante: "256GB", valorAparelho: 2499.00 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Moto G84", variante: "256GB", valorAparelho: 1899.00 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Moto G55", variante: "256GB", valorAparelho: 1599.00 },
  { tipo: "celular", fabricante: "Motorola", modelo: "Moto G54", variante: "256GB", valorAparelho: 1399.00 },

  // Xiaomi
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Redmi Note 13 Pro Plus", variante: "512GB", valorAparelho: 2799.00 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Redmi Note 13 Pro", variante: "256GB", valorAparelho: 2199.00 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Poco X6 Pro", variante: "512GB", valorAparelho: 2499.00 },
  { tipo: "celular", fabricante: "Xiaomi", modelo: "Poco X6", variante: "256GB", valorAparelho: 1999.00 },

  // ===================== SMARTWATCH =====================

  // Apple
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch Ultra 2", variante: "49mm", valorAparelho: 8299.00 },
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch Series 10", variante: "46mm", valorAparelho: 5299.00 },
  { tipo: "smartwatch", fabricante: "Apple", modelo: "Apple Watch SE", variante: "44mm", valorAparelho: 2999.00 },

  // Samsung
  { tipo: "smartwatch", fabricante: "Samsung", modelo: "Galaxy Watch 7", variante: "44mm", valorAparelho: 2199.00 },
  { tipo: "smartwatch", fabricante: "Samsung", modelo: "Galaxy Watch Ultra", variante: "47mm", valorAparelho: 4499.00 },

  // Garmin
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Forerunner 265", variante: "46mm", valorAparelho: 3999.00 },
  { tipo: "smartwatch", fabricante: "Garmin", modelo: "Venu 3", variante: "45mm", valorAparelho: 3699.00 }
];
