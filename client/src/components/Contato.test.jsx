import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Contato from "./Contato.jsx";

async function fillRequiredFields(user) {
  await user.type(screen.getByLabelText("Nome"), "Maria Silva");
  await user.type(screen.getByLabelText("E-mail"), "maria@acme.com");
}

describe("Contato", () => {
  beforeEach(() => {
    vi.spyOn(window, "open").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mostra erros de validação e não abre o WhatsApp quando nome/e-mail estão vazios", async () => {
    const user = userEvent.setup();
    render(<Contato />);

    await user.click(screen.getByRole("button", { name: /Enviar pelo WhatsApp/ }));

    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(window.open).not.toHaveBeenCalled();
  });

  it("abre o WhatsApp só com nome e e-mail, sem exigir empresa", async () => {
    const user = userEvent.setup();
    render(<Contato />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /Enviar pelo WhatsApp/ }));

    expect(window.open).toHaveBeenCalledTimes(1);
    const [url] = window.open.mock.calls[0];
    const texto = decodeURIComponent(url);
    expect(url).toMatch(/^https:\/\/wa\.me\//);
    expect(texto).toContain("Nome: Maria Silva");
    expect(texto).not.toContain("Empresa:");

    expect(await screen.findByRole("status")).toHaveTextContent("Abrimos o WhatsApp");
  });

  it("inclui a empresa na mensagem quando preenchida", async () => {
    const user = userEvent.setup();
    render(<Contato />);

    await fillRequiredFields(user);
    await user.type(screen.getByLabelText(/^Empresa/), "Acme Ltda");
    await user.click(screen.getByRole("button", { name: /Enviar pelo WhatsApp/ }));

    const [url] = window.open.mock.calls[0];
    expect(decodeURIComponent(url)).toContain("Empresa: Acme Ltda");
  });
});
