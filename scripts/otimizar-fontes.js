// Utilitário de manutenção: converte fontes TTF para WOFF2 (mesmo conteúdo, ~60-70% menor).
// Uso: node scripts/otimizar-fontes.js
const fs = require("fs");
const path = require("path");
const ttf2woff2 = require("ttf2woff2").default;

const arquivos = [
  "fontes/Lato-Regular.ttf",
  "fontes/Lato-Bold.ttf",
  "fontes/TenorSans-Regular.ttf",
];

for (const caminhoRelativo of arquivos) {
  const origem = path.join(__dirname, "..", caminhoRelativo);
  const destino = origem.replace(/\.ttf$/i, ".woff2");

  const ttfBuffer = fs.readFileSync(origem);
  const woff2Buffer = ttf2woff2(ttfBuffer);
  fs.writeFileSync(destino, woff2Buffer);

  const reducao = (100 - (woff2Buffer.length / ttfBuffer.length) * 100).toFixed(1);
  console.log(
    `${path.basename(origem)} -> ${path.basename(destino)}: ` +
      `${(ttfBuffer.length / 1024).toFixed(0)} KB -> ${(woff2Buffer.length / 1024).toFixed(0)} KB (-${reducao}%)`
  );
}
