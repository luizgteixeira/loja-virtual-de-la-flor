# De La Flor - Site Institucional

Site institucional da **De La Flor**, marca de alfajores peruanos, presentes afetivos e lembranças personalizadas para eventos, celebrações, ações de marca e compra online.

O projeto combina uma experiência visual delicada com uma estrutura simples de manter: HTML, CSS, JavaScript puro e uma pequena camada Node.js/Express para proteger a integração com o Instagram.

## Para Usuários

O site foi pensado para apresentar a marca de forma clara, rápida e acolhedora. A navegação conduz o visitante pelos principais pontos de decisão:

- conhecer a história da De La Flor;
- visualizar opções para eventos e lembranças personalizadas;
- acessar fotos reais da marca;
- conferir produtos disponíveis para compra online;
- ler depoimentos;
- entrar em contato por formulário, WhatsApp, Instagram ou e-mail.

A página prioriza leitura fácil em celulares, links diretos de contato e fallback visual para manter a galeria funcional mesmo quando a API do Instagram não estiver disponível.

## Para Recrutadores

Este projeto demonstra construção de um site institucional completo com atenção a produto, UX, acessibilidade, SEO e segurança básica de integração.

Pontos técnicos relevantes:

- HTML semântico e estrutura de seções clara.
- CSS modular separado por responsabilidade.
- JavaScript simples, legível e sem framework.
- Layout responsivo para desktop, tablet e mobile.
- Menu mobile, carrosséis, formulário e parallax implementados sem dependências de frontend.
- Integração com Instagram protegida por backend Express, sem expor token no navegador.
- Fallback estático para evitar quebra visual quando serviços externos falham.
- Cuidados com SEO, metadados sociais, JSON-LD, textos alternativos e foco visível.
- Deploy preparado para hospedagem Node.js/Express na Hostinger.

## Funcionalidades

- Home com chamada principal e identidade visual da marca.
- Seção de eventos com cards para ocasiões como casamento, 15 anos, batizado, formatura e datas comemorativas.
- Nossa História com imagens e efeito parallax em telas adequadas.
- Galeria de fotos integrada ao Instagram com fallback estático.
- Vitrine/carrossel de compra online.
- Depoimentos com navegação.
- Formulário de contato com validações e mensagens amigáveis.
- Faixa informativa de atendimento otimizada para smartphone.
- Rodapé com contatos, links oficiais e créditos.

## Tecnologias

- HTML5
- CSS3 modular
- JavaScript puro
- Node.js 20.x
- Express
- Instagram Graph API
- JSON-LD para dados estruturados
- Imagens otimizadas em `.webp` quando disponível

## Estrutura do Projeto

```text
.
├── index.html
├── package.json
├── server.js
├── robots.txt
├── sitemap.xml
├── .htaccess
├── README.md
├── alfajor/
│   └── index.html
├── delaflor/
│   └── index.html
├── api/
│   └── instagram-feed.js
├── dados/
│   └── instagram-feed.json
├── css/
│   ├── cabecalho.css
│   ├── compra-on-line.css
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
│   ├── formulario.js
│   ├── instagram-feed.js
│   ├── navegacao.js
│   ├── parallax-sobre.js
│   └── dados/
│       ├── compre-on-line.js
│       └── depoimentos.js
├── fontes/
└── imagens/
```

## Arquivos Principais

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura principal da página e conteúdo institucional. |
| `server.js` | Servidor Express que publica o site e registra a rota `/api/instagram-feed`. |
| `package.json` | Script de inicialização e dependências Node.js. |
| `api/instagram-feed.js` | Endpoint seguro que busca mídias recentes no Instagram. |
| `js/instagram-feed.js` | Consome o endpoint e substitui os cards estáticos por fotos reais. |
| `js/navegacao.js` | Menu mobile, botão voltar ao topo e interações gerais. |
| `js/formulario.js` | Validação e estados do formulário de contato. |
| `js/parallax-sobre.js` | Movimento parallax da seção Nossa História. |
| `css/variaveis.css` | Cores e tokens globais. |
| `css/responsivo.css` | Ajustes de responsividade. |

## Integração com Instagram

A seção de fotos carrega automaticamente até 3 publicações recentes do Instagram por meio de:

```text
/api/instagram-feed
```

O token da Meta/Instagram fica somente no backend. O frontend recebe apenas um JSON seguro:

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

Se a API falhar, retornar vazio ou estiver indisponível, os cards estáticos do HTML continuam visíveis.

### Variáveis de Ambiente

Configure estas variáveis na hospedagem Node.js:

```text
INSTAGRAM_USER_ID=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_GRAPH_API_VERSION=v23.0
INSTAGRAM_ALLOWED_ORIGINS=https://alfajordelaflor.com.br,https://www.alfajordelaflor.com.br
```

Nunca coloque `INSTAGRAM_ACCESS_TOKEN` em HTML, CSS, JavaScript público ou commits.

## Como Rodar

### Com Site Estático

Para validar a interface sem backend:

```bash
python -m http.server 8000
```

Ou use Live Server no VS Code.

Nesse modo, a galeria mantém os cards estáticos porque a rota `/api/instagram-feed` não é executada.

### Com Express

Para rodar a versão com endpoint local:

```bash
npm install
npm start
```

Acesse:

```text
http://localhost:3000
```

Teste o endpoint:

```text
http://localhost:3000/api/instagram-feed
```

As variáveis do Instagram precisam estar disponíveis no ambiente para retornar fotos reais.

## Publicação Na Hostinger

O projeto está preparado para hospedagem Node.js/Express.

Configuração esperada:

- Framework: Express
- Node.js: 20.x
- Diretório raiz: `/`
- Comando de inicialização: `npm start`

Após configurar as variáveis de ambiente na Hostinger, reimplante ou reinicie a aplicação e teste:

```text
https://alfajordelaflor.com.br/api/instagram-feed
```

## Checklist De Validação

Antes de publicar, conferir:

- home abre sem erro;
- menu mobile abre e fecha corretamente;
- links internos navegam para as seções certas;
- galeria mostra fotos reais quando o endpoint está configurado;
- galeria mantém fallback estático quando o endpoint falha;
- formulário valida campos obrigatórios;
- carrosséis funcionam;
- links de Instagram, WhatsApp, e-mail e créditos abrem corretamente;
- console do navegador não mostra erros;
- imagens têm textos alternativos adequados;
- foco por teclado está visível;
- HTML de produção não contém `localhost` fixo;
- token do Instagram não aparece no código público.

## SEO Para Buscas Por Alfajor e DeLaFlor

Foram adicionadas duas páginas de apoio para ajudar mecanismos de busca a entenderem melhor a relação entre a marca e os termos usados pelos clientes:

```text
https://www.alfajordelaflor.com.br/alfajor/
https://www.alfajordelaflor.com.br/delaflor/
```

Essas páginas reforçam termos como `alfajor`, `Alfajor`, `alfajor peruano`, `DeLaFlor`, `delaflor` e `De La Flor`, sem depender de JavaScript.

Também foram ajustados:

- título e descrição da home;
- dados estruturados em JSON-LD;
- Open Graph e Twitter Card;
- `sitemap.xml` com as páginas de apoio;
- redirecionamentos no `server.js` para URLs digitadas diretamente;
- `.htaccess` como apoio caso a publicação passe pelo Apache da Hostinger.

Depois de publicar, solicite a indexação das três URLs no Google Search Console:

```text
https://www.alfajordelaflor.com.br/
https://www.alfajordelaflor.com.br/alfajor/
https://www.alfajordelaflor.com.br/delaflor/
```

## Segurança

- O token do Instagram deve ficar apenas em variável de ambiente.
- A API retorna mensagens genéricas para o usuário.
- O frontend valida URLs antes de renderizar imagens externas.
- O CORS deve aceitar apenas domínios conhecidos em produção.
- Dados sensíveis não devem ser adicionados ao repositório.

## Links Oficiais

- Instagram: <https://www.instagram.com/alfajordelaflor/>
- WhatsApp: <https://wa.me/message/VJUYK3MDBN3VM1/>
- Crédito de layout/design: <https://www.instagram.com/estudiofablo/>
- Crédito de WebDesign/Programação: <https://luizgustavodev.com/>

## Manutenção

Fluxo recomendado:

1. Editar os arquivos diretamente.
2. Validar a interface no navegador.
3. Conferir responsividade no DevTools.
4. Revisar o console.
5. Testar `/api/instagram-feed` quando houver variáveis de ambiente configuradas.
6. Fazer commit com mensagem objetiva.
