# De La Flor - Site Institucional

Site institucional da **De La Flor**, marca de alfajores peruanos, presentes afetivos e lembranças personalizadas para eventos, celebrações, ações de marca e compra online.

O projeto combina uma experiência visual delicada com uma estrutura simples de manter: HTML, CSS, JavaScript puro e uma pequena camada Node.js/Express para servir o site, aplicar redirecionamentos, comprimir respostas e (quando configurada) proteger a integração com o Instagram.

## Para Usuários

O site foi pensado para apresentar a marca de forma clara, rápida e acolhedora. A navegação conduz o visitante pelos principais pontos de decisão:

- conhecer a história da De La Flor;
- visualizar opções para eventos e lembranças personalizadas;
- acessar uma galeria de fotos reais da marca;
- conferir o selo de fornecedor homologado pela Vestidas de Branco (Certificado Trust16);
- ler depoimentos de clientes;
- entrar em contato por formulário, WhatsApp, Instagram ou e-mail.

A página prioriza leitura fácil em celulares, links diretos de contato e um banner de consentimento de cookies (LGPD) antes de carregar qualquer rastreamento de analytics.

## Para Recrutadores

Este projeto demonstra construção de um site institucional completo com atenção a produto, UX, acessibilidade, SEO, performance e segurança básica de integração.

Pontos técnicos relevantes:

- HTML semântico e estrutura de seções clara.
- CSS modular separado por responsabilidade, com variáveis de cor centralizadas.
- JavaScript simples, legível e sem framework — inclusive uma fábrica de carrossel (`createCarousel`) reaproveitada em 4 seções diferentes.
- Layout responsivo para desktop, tablet e mobile.
- Menu mobile, carrosséis, formulário e parallax implementados sem dependências de frontend.
- Integração com Instagram pronta via backend Express (token nunca exposto no navegador), hoje desativada em favor de uma galeria curada manualmente — ver [Integração com Instagram](#integração-com-instagram-desativada).
- Consentimento de cookies (Google Consent Mode) antes de carregar o Google Tag Manager, com página própria de Política de Privacidade.
- Cuidados com SEO, metadados sociais, JSON-LD, textos alternativos, foco visível e página 404 real (sem soft-404).
- Scripts próprios de otimização de imagem/fonte (`sharp`, `ttf2woff2`) usados antes de cada publicação.
- Deploy preparado para hospedagem Node.js/Express na Hostinger.

## Funcionalidades

- Home com chamada principal e identidade visual da marca.
- Seção de eventos com cards para ocasiões como casamento, 15 anos, batizado, primeira eucaristia, formatura e datas comemorativas.
- Nossa História com imagens e efeito parallax em telas adequadas.
- Galeria de fotos em carrossel (3 fotos por vez no desktop, menos em telas pequenas), com curadoria manual.
- Selo "Fornecedor Homologado Vestidas de Branco" (Certificado Trust16), com carrossel próprio.
- Vitrine/carrossel de compra online — já implementada, hoje **desativada temporariamente** (seção `#loja` comentada em `index.html`; CSS/JS continuam no projeto, prontos para reativação).
- Depoimentos de clientes em carrossel (3 por vez no desktop).
- Formulário de contato com validações e mensagens amigáveis.
- Faixa informativa de atendimento otimizada para smartphone.
- Banner de consentimento de cookies + Google Tag Manager, com página de Política de Privacidade.
- Página 404 personalizada.
- Rodapé com contatos em texto real (não em imagem), links oficiais e créditos.

## Tecnologias

- HTML5
- CSS3 modular
- JavaScript puro
- Node.js 20.x
- Express
- [`compression`](https://www.npmjs.com/package/compression) para comprimir respostas do servidor
- Instagram Graph API (integração pronta, atualmente desativada)
- Google Tag Manager + Consent Mode
- JSON-LD para dados estruturados
- Imagens otimizadas em `.webp` (via `sharp`) e fontes em `.woff2` (via `ttf2woff2`)

## Estrutura do Projeto

```text
.
├── index.html
├── 404.html
├── package.json
├── server.js
├── robots.txt
├── sitemap.xml
├── .htaccess
├── .gitignore
├── README.md
├── alfajor/
│   └── index.html
├── delaflor/
│   └── index.html
├── politica-de-privacidade/
│   └── index.html
├── api/
│   └── instagram-feed.js
├── dados/
│   └── instagram-feed.json
├── scripts/
│   ├── otimizar-imagens.js
│   └── otimizar-fontes.js
├── css/
│   ├── cabecalho.css
│   ├── certificacao.css
│   ├── compra-on-line.css
│   ├── cookie-consent.css
│   ├── depoimentos.css
│   ├── ficamos.css
│   ├── formulario.css
│   ├── fotos.css
│   ├── nossa-historia.css
│   ├── principal.css
│   ├── reset.css
│   ├── responsivo.css
│   ├── rodape.css
│   ├── secoes.css
│   ├── tipografia.css
│   └── variaveis.css
├── js/
│   ├── cookie-consent.js
│   ├── instagram-feed.js
│   ├── navegacao.js
│   ├── parallax-sobre.js
│   └── dados/
│       ├── carrossel.js
│       ├── certificacao.js
│       ├── compre-on-line.js
│       ├── depoimentos.js
│       └── fotos.js
├── fontes/
│   ├── *.ttf
│   └── *.woff2
└── imagens/
```

## Arquivos Principais

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura principal da página e conteúdo institucional. |
| `404.html` | Página exibida para qualquer rota não encontrada. |
| `server.js` | Servidor Express: serve o site, comprime respostas, aplica cache de ativos estáticos, redirecionamentos de domínio/URLs alternativas e a rota `/api/instagram-feed`. |
| `package.json` | Scripts de inicialização e dependências Node.js. |
| `api/instagram-feed.js` | Endpoint seguro que busca mídias recentes no Instagram (token fica só no backend). |
| `js/instagram-feed.js` | Consumiria o endpoint acima e substituiria os cards estáticos por fotos reais — hoje não é carregado pelo `index.html`. |
| `js/cookie-consent.js` | Exibe o banner de cookies e atualiza o Google Consent Mode conforme a escolha do visitante. |
| `js/navegacao.js` | Menu mobile, botão voltar ao topo, validação e envio do formulário de contato. |
| `js/parallax-sobre.js` | Movimento parallax da seção Nossa História. |
| `js/dados/carrossel.js` | Fábrica `createCarousel()` compartilhada pelos carrosséis de fotos, depoimentos, certificação e loja. |
| `js/dados/fotos.js`, `depoimentos.js`, `certificacao.js`, `compre-on-line.js` | Inicializam cada carrossel chamando `createCarousel()` com os seletores da sua seção. |
| `css/variaveis.css` | Cores e tokens globais (fonte única para a paleta de cores do site). |
| `css/responsivo.css` | Ajustes de responsividade transversais. |
| `scripts/otimizar-imagens.js` | Redimensiona e converte imagens para `.webp` antes de publicar. |
| `scripts/otimizar-fontes.js` | Converte fontes `.ttf` para `.woff2`. |

## Carrossel Compartilhado

Fotos, Depoimentos, Certificação e (quando reativada) a Loja usam a mesma fábrica `createCarousel()` (`js/dados/carrossel.js`), parametrizada por seletores CSS. Isso evita duplicar lógica de navegação, autoplay, pontos de página e pausa por toque/teclado entre as seções — qualquer correção ou melhoria no comportamento do carrossel vale para todas de uma vez.

## Integração com Instagram (desativada)

A seção de fotos **já teve** um modo automático: buscar até 3 publicações recentes do Instagram via `/api/instagram-feed` e substituir os cards estáticos. O código inteiro continua no projeto (`api/instagram-feed.js`, `js/instagram-feed.js`, rota em `server.js`), mas a tag `<script>` que carregava `js/instagram-feed.js` foi removida do `index.html` — então, hoje, a galeria é sempre a curadoria manual presente no HTML.

Para reativar:

1. Adicionar de volta `<script src="js/instagram-feed.js" defer></script>` no `index.html`.
2. Configurar as variáveis de ambiente abaixo na hospedagem.
3. Testar `/api/instagram-feed` para confirmar que retorna fotos reais.

```json
[
  {
    "imageUrl": "https://...",
    "permalink": "https://www.instagram.com/p/...",
    "caption": "Legenda da foto",
    "timestamp": "2026-06-16T12:00:00Z"
  }
]
```

### Variáveis de Ambiente

Configure estas variáveis na hospedagem Node.js (necessárias apenas se a integração acima for reativada):

```text
INSTAGRAM_USER_ID=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_GRAPH_API_VERSION=v23.0
INSTAGRAM_ALLOWED_ORIGINS=https://alfajordelaflor.com.br,https://www.alfajordelaflor.com.br
```

Nunca coloque `INSTAGRAM_ACCESS_TOKEN` em HTML, CSS, JavaScript público ou commits.

## Cookies e Google Tag Manager

O site carrega o Google Tag Manager (`GTM-MGVL3J9N`) com o Google Consent Mode configurado para negar `analytics_storage` por padrão. Ao abrir o site, o visitante vê um banner (`js/cookie-consent.js` + `css/cookie-consent.css`) para aceitar ou recusar cookies de analytics; a escolha fica salva em `localStorage` e não é pedida novamente. O link para a Política de Privacidade (`/politica-de-privacidade/`) aparece no banner e no rodapé.

## Como Rodar

### Com Site Estático

Para validar a interface sem backend:

```bash
python -m http.server 8000
```

Ou use Live Server no VS Code.

### Com Express

Para rodar a versão completa (com compressão, cache e a rota de API, mesmo que ela esteja desativada no frontend):

```bash
npm install
npm start
```

Acesse:

```text
http://localhost:3000
```

## Scripts de Manutenção

Antes de adicionar imagens ou fontes novas ao projeto, rode:

```bash
node scripts/otimizar-imagens.js
node scripts/otimizar-fontes.js
```

Eles redimensionam/comprimem imagens para `.webp` e convertem fontes `.ttf` para `.woff2`, mantendo o peso do site baixo. Ajuste a lista de arquivos dentro de cada script conforme necessário.

## Publicação Na Hostinger

O projeto está preparado para hospedagem Node.js/Express.

Configuração esperada:

- Framework: Express
- Node.js: 20.x
- Diretório raiz: `/`
- Comando de inicialização: `npm start`

## Checklist De Validação

Antes de publicar, conferir:

- home abre sem erro;
- menu mobile abre e fecha corretamente;
- links internos navegam para as seções certas;
- os carrosséis (fotos, depoimentos, certificação) funcionam e pausam ao tocar/focar;
- formulário valida campos obrigatórios e envia corretamente;
- banner de cookies aparece, salva a escolha e não volta a aparecer depois;
- uma URL inexistente retorna a página 404 (não a home);
- links de Instagram, WhatsApp, e-mail e créditos abrem corretamente;
- console do navegador não mostra erros;
- imagens têm textos alternativos adequados;
- foco por teclado está visível;
- HTML de produção não contém `localhost` fixo;
- token do Instagram não aparece no código público (só é necessário se a integração automática for reativada).

## SEO Para Buscas Por Alfajor e DeLaFlor

Existem duas páginas de apoio para ajudar mecanismos de busca a entenderem melhor a relação entre a marca e os termos usados pelos clientes:

```text
https://www.alfajordelaflor.com.br/alfajor/
https://www.alfajordelaflor.com.br/delaflor/
```

Essas páginas reforçam termos como `alfajor`, `Alfajor`, `alfajor peruano`, `DeLaFlor`, `delaflor` e `De La Flor`, sem depender de JavaScript.

Também foram ajustados:

- título e descrição da home;
- dados estruturados em JSON-LD (tipo `Bakery`, sem `Product` — ver `INSTRUCOES-CORRECAO-SCHEMA.txt`);
- Open Graph e Twitter Card;
- `sitemap.xml` com as páginas de apoio;
- redirecionamentos no `server.js` e no `.htaccess` para URLs digitadas diretamente.

Depois de publicar, solicite a indexação das URLs no Google Search Console.

## Segurança

- O token do Instagram deve ficar apenas em variável de ambiente (só é usado se a integração automática for reativada).
- A API retorna mensagens genéricas para o usuário.
- O frontend valida URLs antes de renderizar imagens externas.
- O CORS deve aceitar apenas domínios conhecidos em produção.
- Analytics só é ativado depois do consentimento do visitante (Google Consent Mode).
- Dados sensíveis não devem ser adicionados ao repositório.

## Links Oficiais

- Instagram: <https://www.instagram.com/alfajordelaflor/>
- WhatsApp: <https://wa.me/message/VJUYK3MDBN3VM1/>
- Crédito de layout/design: <https://www.instagram.com/estudiofablo/>
- Crédito de WebDesign/Programação: <https://luizgustavodev.com/>

## Manutenção

Fluxo recomendado:

1. Editar os arquivos diretamente.
2. Rodar os scripts de otimização ao adicionar imagem/fonte nova.
3. Validar a interface no navegador.
4. Conferir responsividade no DevTools.
5. Revisar o console.
6. Rodar o checklist de validação acima.
7. Fazer commit com mensagem objetiva.
