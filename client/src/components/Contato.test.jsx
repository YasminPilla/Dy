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
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mostra erros de validação e não envia quando campos obrigatórios estão vazios", async () => {
    const user = userEvent.setup();
    render(<Contato />);

    await user.click(screen.getByRole("button", { name: /Enviar solicitação/ }));

    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe o nome da empresa.")).toBeInTheDocument();
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("envia o formulário e mostra mensagem de sucesso quando a API responde ok", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true });
    const user = userEvent.setup();
    render(<Contato />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /Enviar solicitação/ }));

    expect(await screen.findByRole("status")).toHaveTextContent("Recebido.");
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("mostra mensagem de erro quando a API falha", async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });
    const user = userEvent.setup();
    render(<Contato />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /Enviar solicitação/ }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Não foi possível enviar.");
  });
});
