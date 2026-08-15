import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CircleButton from "./CircleButton.jsx";

describe("CircleButton", () => {
  it("renderiza como link quando recebe href", () => {
    render(<CircleButton href="#contato">Ir</CircleButton>);
    const link = screen.getByRole("link", { name: /Ir/ });
    expect(link).toHaveAttribute("href", "#contato");
  });

  it("renderiza como botão e dispara onClick quando não recebe href", () => {
    const onClick = vi.fn();
    render(<CircleButton onClick={onClick}>Clique</CircleButton>);
    const btn = screen.getByRole("button", { name: /Clique/ });
    btn.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fica desabilitado quando disabled=true", () => {
    render(
      <CircleButton type="submit" disabled>
        Enviar
      </CircleButton>
    );
    expect(screen.getByRole("button", { name: /Enviar/ })).toBeDisabled();
  });
});
