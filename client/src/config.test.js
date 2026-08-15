import { describe, expect, it } from "vitest";
import { config, waLink } from "./config.js";

describe("waLink", () => {
  it("monta a URL do wa.me com número e mensagem codificada", () => {
    const link = waLink();
    expect(link).toBe(
      `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMsg)}`
    );
    expect(link.startsWith("https://wa.me/")).toBe(true);
  });
});
