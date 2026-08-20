import { useReveal } from "../hooks/useReveal.js";

const PASSOS = [
  { n: "i", t: "Entendemos", d: "O negócio, o momento e o que realmente precisa ser resolvido." },
  { n: "ii", t: "Planejamos", d: "O caminho: consultoria, site, negociação — o que fizer sentido pro caso." },
  { n: "iii", t: "Executamos", d: "Colocamos a mão na massa, do site à negociação." },
  { n: "iv", t: "Acompanhamos", d: "Seguimos ao lado até o resultado aparecer." },
];

export default function Processo() {
  const ref = useReveal();
  return (
    <section id="processo" className="light" ref={ref}>
      <div className="wrap">
        <div className="head reveal">
          <span className="label">Como trabalhamos</span>
          <h2 className="h2">Quatro movimentos, sempre com os sócios à frente.</h2>
        </div>
        <div className="passos">
          {PASSOS.map((p, i) => (
            <div className="passo reveal" key={p.n} style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="pn">{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
        <p className="passos-fecho reveal">
          Sem soluções de prateleira. <em>Cada situação exige uma estratégia própria.</em>
        </p>
      </div>
    </section>
  );
}
