# Dy Assistent — Site institucional

Frontend em **React (Vite)** + backend em **Node/Express**.

## Estrutura
```
dy-assistent/
├── client/           # React (Vite)
│   ├── public/           # robots.txt, sitemap.xml
│   └── src/
│       ├── components/   # Um componente por seção (+ *.test.jsx)
│       ├── hooks/        # useReveal (animação de entrada)
│       ├── test/         # setup do Vitest
│       └── styles/       # global.css
└── server/           # Node/Express (API do formulário)
    ├── lib/              # leadsStore (backup em arquivo) e mailer (Nodemailer)
    └── app.test.js       # testes de API (Vitest + Supertest)
```

## Rodando em desenvolvimento
```bash
npm install            # instala o concurrently
npm run install:all    # instala client e server
npm run dev            # sobe os dois: client em :5173, API em :3001
```
O Vite faz proxy de `/api` para o servidor Node.

## Testes
```bash
npm --prefix client test   # componentes React (Vitest + Testing Library)
npm --prefix server test   # API (Vitest + Supertest)
```

## Produção
```bash
npm run build          # gera client/dist
npm start               # Express serve a API e o build em :3001
```

## Configurar
- **WhatsApp**: edite `client/src/config.js` (número no formato 55DDDNUMERO).
- **Placeholders** ([NOME DO SÓCIO 01] etc.): em `client/src/config.js`.
- **LinkedIn**: deixe `linkedin` vazio em `client/src/config.js` para ocultar o link até ter a URL real.
- **SEO**: antes de publicar, troque o domínio placeholder (`https://www.dyassistent.com.br/`) em
  `client/index.html` (canonical, og:url, JSON-LD) e `client/public/robots.txt`/`sitemap.xml` pelo domínio real.
- **Envio de e-mail**: copie `server/.env.example` para `server/.env` e preencha `SMTP_*`/`LEAD_TO_EMAIL`
  para habilitar o envio via Nodemailer (`server/lib/mailer.js`). Sem essas variáveis, os leads continuam
  sendo apenas registrados no console e salvos em `server/leads.jsonl` como backup.
- **CORS em produção**: defina `CORS_ORIGIN` no `.env` do servidor com a URL pública do site.
