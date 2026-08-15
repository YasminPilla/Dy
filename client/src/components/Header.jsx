import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection.js";

const LINKS = [
  { href: "#atuacao", label: "Atuação" },
  { href: "#processo", label: "Processo" },
  { href: "#socios", label: "Sobre nós" },
];
const SECTION_IDS = LINKS.map((l) => l.href.slice(1));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className={scrolled ? "scrolled" : ""}>
        <nav className="nav" aria-label="Navegação principal">
          <a className="logo" href="#inicio">
            <span className="dy">Dy</span>
            <span className="rest">Assistent</span>
          </a>
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={active === l.href.slice(1) ? "active" : ""}
                  aria-current={active === l.href.slice(1) ? "true" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-cta">
              <a className="talk" href="#contato">
                Agendar conversa
                <span className="mini">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
          <button
            className="hamburger"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={menuOpen ? "open" : ""} /><span className={menuOpen ? "open" : ""} />
          </button>
        </nav>
      </header>
      <div id="menu-mobile" className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {[...LINKS, { href: "#contato", label: "Agendar conversa" }].map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
