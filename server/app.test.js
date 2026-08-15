import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./lib/leadsStore.js", () => ({ appendLead: vi.fn().mockResolvedValue() }));
vi.mock("./lib/mailer.js", () => ({ sendLeadEmail: vi.fn().mockResolvedValue({ sent: false }) }));

const { appendLead } = await import("./lib/leadsStore.js");
const { sendLeadEmail } = await import("./lib/mailer.js");
const { createApp } = await import("./app.js");

const VALID_LEAD = {
  nome: "Maria Silva",
  empresa: "Acme Ltda",
  email: "maria@acme.com",
  whatsapp: "11999999999",
  tipo: "Negociação",
  descricao: "Preciso de ajuda para negociar um contrato.",
};

describe("GET /api/health", () => {
  it("responde ok", async () => {
    const app = createApp();
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejeita payload sem os campos obrigatórios", async () => {
    const app = createApp();
    const res = await request(app).post("/api/contact").send({});
    expect(res.status).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.errors).toEqual(expect.arrayContaining(["nome", "empresa", "email"]));
    expect(appendLead).not.toHaveBeenCalled();
  });

  it("rejeita e-mail em formato inválido", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/contact")
      .send({ ...VALID_LEAD, email: "não-é-um-email" });
    expect(res.status).toBe(400);
    expect(res.body.errors).toContain("email");
  });

  it("aceita payload válido, persiste o lead e tenta enviar e-mail", async () => {
    const app = createApp();
    const res = await request(app).post("/api/contact").send(VALID_LEAD);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(appendLead).toHaveBeenCalledTimes(1);
    expect(appendLead).toHaveBeenCalledWith(
      expect.objectContaining({ nome: "Maria Silva", empresa: "Acme Ltda", email: "maria@acme.com" })
    );
    expect(sendLeadEmail).toHaveBeenCalledTimes(1);
  });

  it("aplica rate limit após muitas requisições seguidas", async () => {
    const app = createApp();
    let lastStatus;
    for (let i = 0; i < 11; i++) {
      const res = await request(app).post("/api/contact").send(VALID_LEAD);
      lastStatus = res.status;
    }
    expect(lastStatus).toBe(429);
  });
});

describe("rotas de API desconhecidas", () => {
  it("responde 404 para uma rota de API inexistente (não cai no fallback do SPA)", async () => {
    const app = createApp();
    const res = await request(app).get("/api/rota-que-nao-existe");
    expect(res.status).toBe(404);
  });
});
