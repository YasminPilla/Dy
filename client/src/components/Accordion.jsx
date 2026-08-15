import { useEffect, useRef, useState } from "react";

/** Acordeão acessível: um item aberto por vez. */
export default function Accordion({ items, variant = "faq" }) {
  const [open, setOpen] = useState(null);
  const refs = useRef([]);

  // Recalcula a altura do item aberto quando a janela é redimensionada
  // (ex.: rotação do celular), evitando que o texto seja cortado.
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (open === null) return;
    const onResize = () => forceUpdate((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  if (variant === "idx") {
    return (
      <ul className="idx reveal">
        {items.map((it, i) => {
          const panelId = `idx-panel-${i}`;
          return (
            <li key={it.title} className={`idx-item ${open === i ? "open" : ""}`}>
              <button
                className="idx-btn"
                aria-expanded={open === i}
                aria-controls={panelId}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="idx-num" aria-hidden="true">{it.num}</span>
                <span className="idx-title">{it.title}</span>
                <span className="idx-arrow" aria-hidden="true">→</span>
              </button>
              <div
                id={panelId}
                className="idx-body"
                ref={(el) => (refs.current[i] = el)}
                style={{ maxHeight: open === i ? refs.current[i]?.scrollHeight : 0 }}
              >
                <p>{it.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="reveal">
      {items.map((it, i) => {
        const panelId = `faq-panel-${i}`;
        return (
          <div key={it.title} className={`faq-item ${open === i ? "open" : ""}`}>
            <button
              className="faq-q"
              aria-expanded={open === i}
              aria-controls={panelId}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {it.title}
              <span className="sig" aria-hidden="true">+</span>
            </button>
            <div
              id={panelId}
              className="faq-a"
              ref={(el) => (refs.current[i] = el)}
              style={{ maxHeight: open === i ? refs.current[i]?.scrollHeight : 0 }}
            >
              <p>{it.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
