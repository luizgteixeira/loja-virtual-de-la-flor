// Utilitário de manutenção: redimensiona e converte imagens grandes para WebP.
// Uso: node scripts/otimizar-imagens.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const MAX_WIDTH = 1200;
const QUALITY = 80;

const arquivos = [
  "imagens/galeria/eventos/Casamento.jpg",
  "imagens/galeria/eventos/15anosProvisoria.jpg",
  "imagens/galeria/eventos/DatasComemorativas.jpg",
  "imagens/galeria/nossa-historia/FotosFamilia.png",
];

async function otimizar(caminhoRelativo) {
  const origem = path.join(__dirname, "..", caminhoRelativo);
  const destino = origem.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  const tamanhoOriginal = fs.statSync(origem).size;

  await sharp(origem)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(destino);

  const tamanhoNovo = fs.statSync(destino).size;
  fs.unlinkSync(origem);

  const reducao = (100 - (tamanhoNovo / tamanhoOriginal) * 100).toFixed(1);
  console.log(
    `${path.basename(origem)} -> ${path.basename(destino)}: ` +
      `${(tamanhoOriginal / 1024 / 1024).toFixed(2)} MB -> ${(tamanhoNovo / 1024).toFixed(0)} KB (-${reducao}%)`
  );
}

(async () => {
  for (const arquivo of arquivos) {
    await otimizar(arquivo);
  }
})().catch((error) => {
  console.error("Falha ao otimizar imagens:", error);
  process.exitCode = 1;
});
