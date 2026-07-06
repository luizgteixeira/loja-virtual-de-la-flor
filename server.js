const express = require("express");
const fs = require("fs");
const path = require("path");
const instagramFeed = require("./api/instagram-feed");

const app = express();
const port = process.env.PORT || 3000;
const canonicalHost = "www.alfajordelaflor.com.br";
const productionHosts = new Set(["alfajordelaflor.com.br", canonicalHost]);
const siteTitle = "De La Flor | Alfajor peruano artesanal em Belo Horizonte";
const siteDescription =
  "Alfajor peruano artesanal da De La Flor, também buscada como DeLaFlor ou delaflor. Alfajores peruanos, lembranças personalizadas e mimos afetivos para casamentos, eventos, ações de marca e presentes em Belo Horizonte.";
const socialImage = "https://www.alfajordelaflor.com.br/imagens/galeria/fotos/docura-tradicao.png";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Bakery",
      "@id": "https://www.alfajordelaflor.com.br/#bakery",
      name: "De La Flor",
      alternateName: [
        "Alfajor De La Flor",
        "Alfajor DeLaFlor",
        "DeLaFlor",
        "delaflor",
        "Alfajor Peruano",
        "Alfajores Peruanos",
      ],
      url: "https://www.alfajordelaflor.com.br/",
      logo: "https://www.alfajordelaflor.com.br/imagens/logo/logo.webp",
      image: socialImage,
      description:
        "Alfajores peruanos artesanais, lembranças personalizadas e mimos afetivos para casamentos, eventos, ações de marca e presentes em Belo Horizonte.",
      telephone: "+55 31 99847-4128",
      email: "delaflormagali@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Maria Moreira Reis, 26, loja 21",
        addressLocality: "Belo Horizonte",
        addressRegion: "MG",
        postalCode: "31710-320",
        addressCountry: "BR",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Região Metropolitana de Belo Horizonte",
      },
      servesCuisine: "Alfajor peruano",
      priceRange: "$$",
      sameAs: ["https://www.instagram.com/alfajordelaflor/"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: "https://wa.me/message/VJUYK3MDBN3VM1",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.alfajordelaflor.com.br/#website",
      url: "https://www.alfajordelaflor.com.br/",
      name: "De La Flor",
      alternateName: ["DeLaFlor", "delaflor", "Alfajor De La Flor"],
      publisher: {
        "@id": "https://www.alfajordelaflor.com.br/#bakery",
      },
      inLanguage: "pt-BR",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.alfajordelaflor.com.br/#webpage",
      url: "https://www.alfajordelaflor.com.br/",
      name: siteTitle,
      description: siteDescription,
      isPartOf: {
        "@id": "https://www.alfajordelaflor.com.br/#website",
      },
      about: {
        "@id": "https://www.alfajordelaflor.com.br/#bakery",
      },
      inLanguage: "pt-BR",
    },
  ],
};

const escapeHtmlAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const renderSeoIndex = () => {
  const indexPath = path.join(__dirname, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  const escapedTitle = escapeHtmlAttribute(siteTitle);
  const escapedDescription = escapeHtmlAttribute(siteDescription);

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapedTitle}</title>`);
  html = html.replace(
    /<meta name="description"\s+content=".*?"\s*\/>/s,
    `<meta name="description"\n    content="${escapedDescription}" />`,
  );

  if (!html.includes('name="keywords"')) {
    html = html.replace(
      '<meta name="robots" content="index, follow" />',
      '<meta name="keywords" content="alfajor, Alfajor, alfajor peruano, alfajores peruanos, De La Flor, DeLaFlor, delaflor, alfajor em Belo Horizonte, lembranças personalizadas" />\n  <meta name="robots" content="index, follow" />',
    );
  }

  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapedTitle}" />`);
  html = html.replace(
    /<meta property="og:description"\s+content=".*?"\s*\/>/s,
    `<meta property="og:description"\n    content="${escapedDescription}" />`,
  );
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapedTitle}" />`);
  html = html.replace(
    /<meta name="twitter:description"\s+content=".*?"\s*\/>/s,
    `<meta name="twitter:description"\n    content="${escapedDescription}" />`,
  );
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${socialImage}" />`);
  html = html.replace(
    /<script type="application\/ld\+json">.*?<\/script>/s,
    `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n  </script>`,
  );
  html = html.replace(
    "De La Flor - Alfajores peruanos para eventos e presentes",
    "De La Flor - Alfajor peruano artesanal para eventos e presentes",
  );

  return html;
};

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

app.get(["/", "/index.html"], (request, response) => {
  response.type("html").send(renderSeoIndex());
});

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
