import Accordion from "./Accordion.jsx";
import { useReveal } from "../hooks/useReveal.js";

const PERGUNTAS = [
  { title: "Vocês trabalham com qualquer empresa?", body: "Não necessariamente. Depende do contexto e da nossa capacidade de gerar valor — avaliamos isso juntos na primeira conversa." },
  { title: "Vocês garantem a entrada em determinado cliente?", body: "Não prometemos o que não podemos garantir. Entregamos estratégia, aproximação e condução — as decisões finais são das partes." },
  { title: "Vocês trabalham com negociações confidenciais?", body: "Sim — sigilo e discrição fazem parte de como trabalhamos." },
  { title: "Vocês atendem projetos pontuais?", body: "Sim — de uma negociação específica a relacionamentos de acompanhamento contínuo, conforme o caso." },
  { title: "Vocês atuam em todo o Brasil?", body: "[INSERIR ÁREA DE ATUAÇÃO GEOGRÁFICA CONFORME A OPERAÇÃO REAL.]" },
  { title: "Como funciona o primeiro contato?", body: "Uma conversa para entender o seu cenário e avaliar, juntos, se existe aderência entre o desafio e a nossa atuação." },
];

export default function Faq() {
  const ref = useReveal();
  return (
    <section className="alt" ref={ref}>
      <div className="wrap">
        <div className="head reveal">
          <span className="label">Antes da primeira conversa</span>
          <h2 className="h2">O que costumam nos perguntar.</h2>
        </div>
        <Accordion items={PERGUNTAS} variant="faq" />
      </div>
    </section>
  );
}
