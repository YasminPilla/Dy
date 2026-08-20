import { useReveal } from "../hooks/useReveal.js";

const DIFS = [
  { k: "a.", t: "Proximidade", d: "Os sócios participam diretamente de cada projeto. Sem camadas." },
  { k: "b.", t: "Sob medida", d: "Sem pacote fechado. Cada negócio recebe o que realmente precisa." },
  { k: "c.", t: "Visão de negócio", d: "Cada solução pensada dentro da realidade e do momento do cliente." },
  { k: "d.", t: "Discrição", d: "Cada informação do seu negócio tratada com sigilo." },
  { k: "e.", t: "Execução", d: "Não paramos na recomendação. Ajudamos a colocar em prática." },
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
