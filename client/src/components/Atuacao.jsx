import Accordion from "./Accordion.jsx";
import { useReveal } from "../hooks/useReveal.js";

const FRENTES = [
  { num: "01", title: "Acesso a clientes", body: "Abrimos a porta certa: aproximação direta com clientes e decisores estratégicos." },
  { num: "02", title: "Desenvolvimento de negócios", body: "Identificamos oportunidades reais e estruturamos o caminho até o negócio fechado." },
  { num: "03", title: "Negociações estratégicas", body: "Preparação, interlocução e condução das negociações que mais importam." },
  { num: "04", title: "Contratos & acordos", body: "Apoio estratégico em contratos e acordos comerciais, em conjunto com os profissionais jurídicos responsáveis." },
  { num: "05", title: "Relacionamentos estratégicos", body: "Aproximamos empresas, investidores e parceiros quando há sinergia real." },
  { num: "06", title: "Representação estratégica", body: "Atuamos como extensão da sua empresa onde, sozinha, ela ainda não consegue chegar." },
];

export default function Atuacao() {
  const ref = useReveal();
  return (
    <section className="alt" id="atuacao" ref={ref}>
      <div className="wrap">
        <div className="head reveal">
          <span className="label">Nossa atuação</span>
          <h2 className="h2">Seis frentes. Um princípio: <em>entramos em campo</em>.</h2>
        </div>
        <Accordion items={FRENTES} variant="idx" />
        <p className="nota reveal">
          Atuação comercial e estratégica. Questões jurídicas ficam com os profissionais
          habilitados de cada cliente.
        </p>
      </div>
    </section>
  );
}
