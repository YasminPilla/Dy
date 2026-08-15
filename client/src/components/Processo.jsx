import { useReveal } from "../hooks/useReveal.js";

const PASSOS = [
  { n: "i", t: "Entendemos", d: "O negócio, o contexto e o que realmente precisa ser resolvido." },
  { n: "ii", t: "Mapeamos", d: "Pessoas, empresas, caminhos e obstáculos." },
  { n: "iii", t: "Conectamos", d: "Criamos as aproximações necessárias para avançar." },
  { n: "iv", t: "Conduzimos", d: "Acompanhamos até virar negociação, parceria ou negócio." },
];

export default function Processo() {
  const ref = useReveal();
  return (
    <section id="processo" ref={ref}>
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
