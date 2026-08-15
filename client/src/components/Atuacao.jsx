import Accordion from "./Accordion.jsx";
import { useReveal } from "../hooks/useReveal.js";

const FRENTES = [
  { num: "01", title: "Acesso a clientes", body: "Abrimos a porta certa: aproximação direta com clientes e decisores estratégicos." },
  { num: "02", title: "Desenvolvimento de negócios", body: "Identificamos oportunidades concretas e estruturamos o caminho até o negócio fechado." },
  { num: "03", title: "Negociações", body: "Preparação, interlocução e condução das negociações que mais importam." },
  { num: "04", title: "Contratos & acordos", body: "Apoio em contratos e acordos comerciais, ao lado dos profissionais jurídicos responsáveis." },
  { num: "05", title: "Relacionamentos", body: "Aproximamos empresas, investidores e parceiros quando há sinergia genuína." },
  { num: "06", title: "Representação", body: "Atuamos como extensão da sua empresa onde, sozinha, ela ainda não consegue chegar." },
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
          Atuação comercial, não jurídica — isso fica com os profissionais habilitados
          de cada cliente.
        </p>
      </div>
    </section>
  );
}
