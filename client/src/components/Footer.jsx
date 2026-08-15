import { config, waLink } from "../config.js";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a className="logo" href="#inicio">
              <span className="dy">Dy</span>
              <span className="rest">Assistent</span>
            </a>
            <p>Da primeira conversa <em>ao acordo</em>.</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Navegação</h4>
              <a href="#atuacao">Atuação</a>
              <a href="#processo">Processo</a>
              <a href="#socios">Sobre nós</a>
              <a href="#contato">Contato</a>
            </div>
            <div className="foot-col">
              <h4>Contato</h4>
              <a href={`mailto:${config.email}`}>{config.email}</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              {config.linkedin && (
                <a href={config.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              )}
            </div>
          </div>
        </div>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} {config.empresa}. Todos os direitos reservados.</span>
          <a className="to-top" href="#inicio">
            Voltar ao topo
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
