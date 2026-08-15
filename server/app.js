import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appendLead } from "./lib/leadsStore.js";
import { sendLeadEmail } from "./lib/mailer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_FIELD_LEN = 2000;

function validateLead(body) {
  const { nome, empresa, email, whatsapp, tipo, descricao } = body || {};
  const errors = [];
  if (!nome?.trim()) errors.push("nome");
  if (!empresa?.trim()) errors.push("empresa");
  if (!email?.trim() || !EMAIL_RE.test(email.trim())) errors.push("email");
  for (const [field, value] of Object.entries({ nome, empresa, email, whatsapp, tipo, descricao })) {
    if (typeof value === "string" && value.length > MAX_FIELD_LEN) errors.push(field);
  }
  return errors;
}

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors(
      process.env.CORS_ORIGIN
        ? { origin: process.env.CORS_ORIGIN }
        : { origin: process.env.NODE_ENV === "production" ? false : true }
    )
  );
  app.use(express.json({ limit: "20kb" }));

  app.get("/api/health", (_req, res) => res.json({ ok: true }));

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, errors: ["rate-limit"] },
  });

  app.post("/api/contact", contactLimiter, async (req, res) => {
    const errors = validateLead(req.body);
    if (errors.length) {
      return res.status(400).json({ ok: false, errors });
    }

    const { nome, empresa, email, whatsapp, tipo, descricao } = req.body;
    const lead = {
      nome: nome.trim(),
      empresa: empresa.trim(),
      email: email.trim(),
      whatsapp: whatsapp?.trim() || null,
      tipo: tipo || null,
      descricao: descricao?.trim() || null,
      recebidoEm: new Date().toISOString(),
    };

    console.log("Novo contato recebido:", lead);

    try {
      await appendLead(lead);
    } catch (err) {
      console.error("Falha ao salvar lead em arquivo:", err);
    }

    try {
      await sendLeadEmail(lead);
    } catch (err) {
      console.error("Falha ao enviar e-mail do lead:", err);
    }

    res.json({ ok: true });
  });

  /* ---------- Produção: serve o build do React ---------- */
  const dist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(dist, "index.html"), (err) => {
      if (err) res.status(404).send("Build não encontrado. Rode: npm run build");
    });
  });

  return app;
}
