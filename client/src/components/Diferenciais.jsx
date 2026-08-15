import { useReveal } from "../hooks/useReveal.js";

const DIFS = [
  { k: "a.", t: "Relacionamento", d: "Interlocução com diferentes perfis de decisores e empresas." },
  { k: "b.", t: "Visão de negócio", d: "Cada negociação avaliada dentro do contexto do negócio." },
  { k: "c.", t: "Proximidade", d: "Os sócios participam diretamente. Sem camadas." },
  { k: "d.", t: "Discrição", d: "Cada informação tratada com sigilo absoluto." },
  { k: "e.", t: "Execução", d: "Não terminamos na recomendação. Seguimos até o resultado." },
];

export default function Diferenciais() {
  const ref = useReveal();
  return (
    <section className="alt" ref={ref}>
      <div className="wrap">
        <div className="head reveal">
          <span className="label">Nosso diferencial</span>
          <h2 className="h2">Conhecimento importa. Relacionamento e execução também.</h2>
        </div>
        <div className="difs reveal">
          {DIFS.map((d) => (
            <div className="dif" key={d.k}>
              <span className="k">{d.k}</span>
              <div>
                <h3>{d.t}</h3>
                <p>{d.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
