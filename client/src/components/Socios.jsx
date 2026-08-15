import { config, waLink } from "../config.js";
import { useReveal } from "../hooks/useReveal.js";

export default function Socios() {
  const ref = useReveal();
  return (
    <section id="socios" className="light" ref={ref}>
      <div className="wrap">
        <div className="head reveal">
          <span className="label">Sobre nós</span>
          <h2 className="h2">Duas pessoas que colocam relacionamento e negócio no centro.</h2>
        </div>
        <div className="socios-grid">
          {config.socios.map((s, i) => (
            <article className="reveal" key={s.nome} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="porta-foto">
                {s.foto ? (
                  <img src={s.foto} alt={`Foto de ${s.nome}`} />
                ) : (
                  <span>[FOTO PROFISSIONAL — {s.nome}]</span>
                )}
              </div>
              <div className="porta-info">
                <h3>{s.nome}</h3>
                <p className="cargo">{s.cargo}</p>
                <p>{s.bio}</p>
                {s.whatsapp && (
                  <a className="socio-wa" href={waLink(s.whatsapp)} target="_blank" rel="noopener noreferrer">
                    Falar com {s.nome.split(" ")[0]} no WhatsApp
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="reveal">
          {config.credibilidade.map((c) => (
            <div className="cred-row" key={c.k}>
              <span className="k">{c.k}</span>
              <p>{c.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
