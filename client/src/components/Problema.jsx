import { useReveal } from "../hooks/useReveal.js";

const DORES = [
  { t: "Falta uma presença profissional", d: "O trabalho é bom, mas ainda não existe um site que passe confiança." },
  { t: "Não sabe por onde começar", d: "Tem talento e clientes, falta direção pra crescer com estrutura." },
  { t: "Negociar sozinho é mais difícil", d: "Fechar parcerias, contratos e fornecedores pesa sem apoio." },
  { t: "O dia a dia toma conta", d: "Tocar o negócio sozinho deixa pouco espaço pra pensar no crescimento." },
];

export default function Problema() {
  const ref = useReveal();
  return (
    <section ref={ref}>
      <div className="wrap grid2">
        <div className="reveal">
          <span className="label">O problema</span>
          <h2 className="h2">Nem sempre falta talento. Falta estrutura pra crescer.</h2>
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
