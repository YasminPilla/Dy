import { describe, expect, it } from "vitest";
import { config, waLink, whatsappGeral } from "./config.js";

describe("whatsappGeral", () => {
  it("sorteia o número de um dos sócios cadastrados", () => {
    const numeros = config.socios.map((s) => s.whatsapp);
    expect(numeros).toContain(whatsappGeral);
  });
});

describe("waLink", () => {
  it("monta a URL do wa.me com número e mensagem codificada, usando o sócio sorteado por padrão", () => {
    const link = waLink();
    expect(link).toBe(
      `https://wa.me/${whatsappGeral}?text=${encodeURIComponent(config.whatsappMsg)}`
    );
    expect(link.startsWith("https://wa.me/")).toBe(true);
  });

  it("aceita um número específico, sobrescrevendo o padrão", () => {
    const link = waLink("5511900000000");
    expect(link.startsWith("https://wa.me/5511900000000?")).toBe(true);
  });
});
