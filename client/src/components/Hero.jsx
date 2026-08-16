import { useEffect } from "react";
import CircleButton from "./CircleButton.jsx";
import { useReveal } from "../hooks/useReveal.js";

export default function Hero() {
  const ref = useReveal();

  // Brilho de fundo segue o mouse bem de leve — só um toque de vida, sem exagero.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = null;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        el.style.setProperty("--mx", (mx * 14).toFixed(1));
        el.style.setProperty("--my", (my * 14).toFixed(1));
        frame = null;
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return (
    <section className="hero" id="inicio" ref={ref}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-corners" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <div className="wrap hero-in">
        <span className="label reveal">Consultoria empresarial estratégica</span>
        <h1 className="reveal" style={{ transitionDelay: ".1s" }}>
          Entramos onde sua empresa <em>precisa chegar</em>.
        </h1>
        <p className="reveal" style={{ transitionDelay: ".2s" }}>
          Acesso a clientes, negociações e relacionamentos de alto nível — da primeira
          conversa ao acordo.
        </p>
        <div className="hero-ctas reveal" style={{ transitionDelay: ".3s" }}>
          <CircleButton href="#contato" variant="blue">Agendar uma conversa</CircleButton>
          <CircleButton href="#atuacao" direction="down">Nossa atuação</CircleButton>
        </div>
        <div className="hero-tags reveal" style={{ transitionDelay: ".4s" }}>
          <span>Estratégia</span><span>Relacionamento</span>
          <span>Negociação</span><span>Confidencialidade</span>
        </div>
      </div>
    </section>
  );
}
