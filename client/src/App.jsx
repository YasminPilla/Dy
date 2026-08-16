import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Problema from "./components/Problema.jsx";
import Atuacao from "./components/Atuacao.jsx";
import Processo from "./components/Processo.jsx";
import Diferenciais from "./components/Diferenciais.jsx";
import Socios from "./components/Socios.jsx";
import Faq from "./components/Faq.jsx";
import Contato from "./components/Contato.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="conteudo">
        <Hero />
        <Problema />
        <Atuacao />
        <Processo />
        <Diferenciais />
        <Socios />
        <Faq />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
