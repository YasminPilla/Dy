import { useEffect, useState } from "react";
import { waLink } from "../config.js";

export default function WhatsAppButton() {
  const [hidden, setHidden] = useState(false);

  // Esconde o botão flutuante quando a seção de Contato está visível: ela já é
  // inteira sobre WhatsApp, então os dois competindo por espaço só atrapalha.
  useEffect(() => {
    const contato = document.getElementById("contato");
    if (!contato) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(contato);
    return () => io.disconnect();
  }, []);

  return (
    <a
      className={`wa${hidden ? " wa--hidden" : ""}`}
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com um sócio pelo WhatsApp"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z"/>
      </svg>
    </a>
  );
}
