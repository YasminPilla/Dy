import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Header from "./Header.jsx";

describe("Header", () => {
  it("renderiza os links de navegação e o CTA", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Navegação principal" });
    expect(within(nav).getByRole("link", { name: "Atuação" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Processo" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Sobre nós" })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /Agendar conversa/ })).toBeInTheDocument();
  });

  it("abre e fecha o menu mobile ao clicar no botão hambúrguer", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("fecha o menu mobile ao pressionar Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("button", { name: "Fechar menu" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Abrir menu" })).toBeInTheDocument();
  });
});
