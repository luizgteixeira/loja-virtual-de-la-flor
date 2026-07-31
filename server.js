const express = require("express");
const path = require("path");
const compression = require("compression");
const instagramFeed = require("./api/instagram-feed");

const app = express();
const port = process.env.PORT || 3000;
const canonicalHost = "www.alfajordelaflor.com.br";
const productionHosts = new Set(["alfajordelaflor.com.br", canonicalHost]);

app.set("trust proxy", true);
// Sem isto, o Express casa "/alfajor" tanto com ou sem barra final, e as
// rotas de redirecionamento abaixo entravam em loop ao redirecionar
// "/alfajor/" para "/alfajor/" (mesma URL) indefinidamente.
app.set("strict routing", true);
app.use(compression());

app.use((request, response, next) => {
  const host = (request.headers.host || "").split(":")[0].toLowerCase();
  const forwardedProtoHeader = request.headers["x-forwarded-proto"];
  const forwardedProto = Array.isArray(forwardedProtoHeader)
    ? forwardedProtoHeader[0]
    : forwardedProtoHeader;
  const protocol = (forwardedProto || request.protocol || "").split(",")[0].trim();

  if (productionHosts.has(host) && (host !== canonicalHost || protocol !== "https")) {
    return response.redirect(301, `https://${canonicalHost}${request.originalUrl}`);
  }

  return next();
});

app.get("/api/instagram-feed", instagramFeed);

app.get("/alfajor", (request, response) => {
  response.redirect(301, "/alfajor/");
});

app.get("/delaflor", (request, response) => {
  response.redirect(301, "/delaflor/");
});

app.get("/de-la-flor", (request, response) => {
  response.redirect(301, "/delaflor/");
});

app.use(
  express.static(__dirname, {
    maxAge: "30d",
    immutable: true,
    setHeaders: (response, filePath) => {
      // HTML e CSS/JS não têm nome versionado (sem hash de build), então não
      // podem usar cache longo/imutável sem arriscar esconder atualizações
      // de conteúdo dos visitantes recorrentes. Imagens e fontes ficam com
      // o cache longo padrão do express.static acima.
      if (/\.html$/i.test(filePath)) {
        response.setHeader("Cache-Control", "no-cache");
      } else if (/\.(css|js)$/i.test(filePath)) {
        response.setHeader("Cache-Control", "public, max-age=3600");
      }
    },
  })
);

app.use((request, response) => {
  response.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
