const express = require("express");
const path = require("path");
const instagramFeed = require("./api/instagram-feed");

const app = express();
const port = process.env.PORT || 3000;
const canonicalHost = "www.alfajordelaflor.com.br";
const productionHosts = new Set(["alfajordelaflor.com.br", canonicalHost]);

app.set("trust proxy", true);

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

app.use(express.static(__dirname));

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
