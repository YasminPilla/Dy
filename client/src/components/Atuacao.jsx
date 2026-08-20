import Accordion from "./Accordion.jsx";
import { useReveal } from "../hooks/useReveal.js";

const FRENTES = [
  { num: "01", title: "Consultoria de negócio", body: "Entendemos o momento do seu negócio e apontamos o caminho pra crescer com direção." },
  { num: "02", title: "Criação de site", body: "Desenvolvemos um site profissional que representa o seu trabalho e gera confiança." },
  { num: "03", title: "Negociações e parcerias", body: "Apoio na negociação de contratos, fornecedores e parcerias comerciais." },
  { num: "04", title: "Acompanhamento contínuo", body: "Seguimos ao lado do cliente enquanto o negócio evolui, não só na entrega inicial." },
];

export default function Atuacao() {
  const ref = useReveal();
  return (
    <section className="alt" id="atuacao" ref={ref}>
      <div className="wrap">
        <div className="head reveal">
          <span className="label">Nossa atuação</span>
          <h2 className="h2">Quatro frentes. Um princípio: <em>entramos em campo</em>.</h2>
        </div>
        <Accordion items={FRENTES} variant="idx" />
        <p className="nota reveal">
          Atuação comercial e de desenvolvimento, não jurídica — contratos formais ficam
          com os profissionais habilitados de cada cliente.
        </p>
      </div>
    </section>
  );
}
