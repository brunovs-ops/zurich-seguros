// Teste rápido da cotação contra os valores reais do print.
import { cotar, cotarTodosPlanos } from "../services/cotacao.js";

const valor = 11499.00; // iPhone 17 Pro 256GB

console.log("=== Validação contra o print (iPhone 17 Pro 256GB) ===\n");

const alvo = cotar(valor, "supercompleto", "reduzida", "anual");
console.log("Supercompleto / Reduzida / Anual");
console.log("  Franquia:", alvo.valorFranquiaBRL, "(print: R$ 2.874,75)");
console.log("  Parcela: ", alvo.resumoParcela, "(print: 12x de R$ 157,06 sem juros)");

const normal = cotar(valor, "supercompleto", "normal", "anual");
console.log("\nFranquia Normal:", normal.valorFranquiaBRL, "(print: R$ 4.599,60)");

console.log("\n=== Todos os planos (Reduzida / Anual) ===");
for (const c of cotarTodosPlanos(valor, "reduzida", "anual")) {
  console.log(`  ${c.planoNome}${c.recomendado ? " (Recomendado)" : ""}: ${c.resumoParcela}`);
}

console.log("\n=== Efeito do recálculo (Supercompleto, variando franquia) ===");
console.log("  Reduzida:", cotar(valor, "supercompleto", "reduzida", "anual").parcelaBRL);
console.log("  Normal:  ", cotar(valor, "supercompleto", "normal", "anual").parcelaBRL);
