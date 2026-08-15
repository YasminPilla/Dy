import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Contato from "./Contato.jsx";

async function fillValidForm(user) {
  await user.type(screen.getByLabelText("Nome"), "Maria Silva");
  await user.type(screen.getByLabelText("Empresa"), "Acme Ltda");
  await user.type(screen.getByLabelText("E-mail"), "maria@acme.com");
}

describe("Contato", () => {
  beforeEach(() => {
    vi.spyOn(window, "open").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mostra erros de validação e não abre o WhatsApp quando campos obrigatórios estão vazios", async () => {
    const user = userEvent.setup();
    render(<Contato />);

    await user.click(screen.getByRole("button", { name: /Enviar pelo WhatsApp/ }));

    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe o nome da empresa.")).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(window.open).not.toHaveBeenCalled();
  });

  it("abre o WhatsApp com a mensagem preenchida quando o formulário é válido", async () => {
    const user = userEvent.setup();
    render(<Contato />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /Enviar pelo WhatsApp/ }));

    expect(window.open).toHaveBeenCalledTimes(1);
    const [url] = window.open.mock.calls[0];
    expect(url).toMatch(/^https:\/\/wa\.me\//);
    expect(decodeURIComponent(url)).toContain("Nome: Maria Silva");
    expect(decodeURIComponent(url)).toContain("Empresa: Acme Ltda");

    expect(await screen.findByRole("status")).toHaveTextContent("Abrimos o WhatsApp");
  });
});
