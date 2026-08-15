import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Accordion from "./Accordion.jsx";

const ITEMS = [
  { title: "Pergunta 1", body: "Resposta 1" },
  { title: "Pergunta 2", body: "Resposta 2" },
];

describe("Accordion", () => {
  it("mantém todos os itens fechados por padrão", () => {
    render(<Accordion items={ITEMS} variant="faq" />);
    for (const btn of screen.getAllByRole("button")) {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("abre um item ao clicar e fecha ao clicar novamente", async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} variant="faq" />);
    const first = screen.getByRole("button", { name: /Pergunta 1/ });

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("permite apenas um item aberto por vez", async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} variant="faq" />);
    const first = screen.getByRole("button", { name: /Pergunta 1/ });
    const second = screen.getByRole("button", { name: /Pergunta 2/ });

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });
});
