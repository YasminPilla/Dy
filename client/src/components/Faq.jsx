import Accordion from "./Accordion.jsx";
import { useReveal } from "../hooks/useReveal.js";

const PERGUNTAS = [
  { title: "Vocês trabalham com qualquer negócio?", body: "Focamos em pequenas empresas e profissionais autônomos, de diferentes ramos — avaliamos o encaixe juntos na primeira conversa." },
  { title: "Vocês garantem resultado?", body: "Não prometemos o que não podemos garantir. Entregamos estratégia, execução e acompanhamento — o resultado também depende do mercado e do momento do negócio." },
  { title: "Vocês cuidam de negociações e informações sensíveis?", body: "Sim — sigilo e discrição fazem parte de como trabalhamos." },
  { title: "Vocês atendem projetos pontuais?", body: "Sim — de um site específico a um acompanhamento contínuo, conforme o caso." },
  { title: "Vocês atuam em todo o Brasil?", body: "Atendemos presencialmente em São Paulo (SP) e remotamente para todo o Brasil." },
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
