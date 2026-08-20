// Configurações editáveis do site
export const config = {
  empresa: "Dy Negócios",
  whatsappMsg:
    "Olá, gostaria de conhecer melhor o trabalho da Dy Negócios e conversar sobre o meu negócio.",
  email: "", // ex.: "contato@dynegocios.com.br" — deixe vazio para ocultar o link
  linkedin: "", // ex.: "https://www.linkedin.com/company/..." — deixe vazio para ocultar o link
  socios: [
    {
      nome: "Yasmin Pilla",
      cargo: "Sócia · Diretora",
      bio: "Sócia-fundadora da Dy Negócios e desenvolvedora, responsável pelas ideias e pela execução de cada projeto. Em contato direto com os clientes, é ela quem acompanha de perto os primeiros clientes de cada negócio atendido.",
      foto: null, // ex.: "/socio1.jpg" (coloque a imagem em client/public)
      whatsapp: "5511939617574",
    },
    {
      nome: "Diogo Zura",
      cargo: "Sócio · Diretor",
      bio: "Sócio-fundador da Dy Negócios e desenvolvedor. Cuida das negociações e dos contratos, sempre em contato direto com os clientes, do primeiro acordo até o fechamento.",
      foto: null,
      whatsapp: "5511991249136",
    },
  ],
  credibilidade: [
    { k: "Clientes", v: "Pequenas empresas e profissionais autônomos, em diferentes ramos" },
    { k: "Experiência", v: "Formação em desenvolvimento de tecnologia, com atuação prática na gestão de pequenos negócios" },
    { k: "Atendimento", v: "Presencial em São Paulo (SP) e remoto para todo o Brasil" },
  ],
};

// Sorteia um sócio por visita para os contatos gerais do site (botão flutuante,
// rodapé, "Falar com um sócio" e o formulário), assim os contatos não caem sempre
// na mesma pessoa.
const socioContatoGeral = config.socios[Math.floor(Math.random() * config.socios.length)];
export const whatsappGeral = socioContatoGeral.whatsapp;

export const waLink = (numero = whatsappGeral, mensagem = config.whatsappMsg) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
