import { useReveal } from "../hooks/useReveal.js";

const DORES = [
  { t: "O decisor está fora de alcance", d: "Você tem a solução, mas não a porta de entrada." },
  { t: "A negociação travou", d: "Falta estratégia e alguém experiente ao lado." },
  { t: "A oportunidade existe", d: "O caminho até o negócio ainda não existe." },
  { t: "O relacionamento não avança", d: "Sem direção estratégica, ele estaciona." },
];

export default function Problema() {
  const ref = useReveal();
  return (
    <section ref={ref}>
      <div className="wrap grid2">
        <div className="reveal">
          <span className="label">O problema</span>
          <h2 className="h2">Nem sempre o problema é a oportunidade. É chegar até ela.</h2>
          <p className="fecho">É nesse espaço que <em>atuamos</em>.</p>
        </div>
        <div className="reveal">
          {DORES.map((d, i) => (
            <div className="dor" key={d.t}>
              <span className="dor-idx">{String(i + 1).padStart(2, "0")}</span>
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
