// Configurações editáveis do site
export const config = {
  empresa: "Dy Negócios",
  whatsappMsg:
    "Olá, gostaria de conhecer melhor o trabalho da Dy Negócios e conversar sobre uma oportunidade.",
  email: "[E-MAIL DA EMPRESA]",
  linkedin: "", // ex.: "https://www.linkedin.com/company/..." — deixe vazio para ocultar o link
  socios: [
    {
      nome: "Yasmin Pilla",
      cargo: "Sócio · Diretor",
      bio: "[EXPERIÊNCIA, SETORES E PRINCIPAIS COMPETÊNCIAS — 2 a 3 linhas.]",
      foto: null, // ex.: "/socio1.jpg" (coloque a imagem em client/public)
      whatsapp: "5511939617574",
    },
    {
      nome: "Diogo Zura",
      cargo: "Sócio · Diretor",
      bio: "[EXPERIÊNCIA, SETORES E PRINCIPAIS COMPETÊNCIAS — 2 a 3 linhas.]",
      foto: null,
      whatsapp: "5511991249136",
    },
  ],
  credibilidade: [
    { k: "Setores", v: "[SETORES COM EXPERIÊNCIA E RELACIONAMENTO]" },
    { k: "Experiência", v: "[ANOS DE EXPERIÊNCIA E TRAJETÓRIAS]" },
    { k: "Mercados", v: "[MERCADOS E REGIÕES DE ATUAÇÃO]" },
  ],
};

// Sorteia um sócio por visita para os contatos gerais do site (botão flutuante,
// rodapé, "Falar com um sócio" e o formulário), assim os contatos não caem sempre
// na mesma pessoa.
const socioContatoGeral = config.socios[Math.floor(Math.random() * config.socios.length)];
export const whatsappGeral = socioContatoGeral.whatsapp;

export const waLink = (numero = whatsappGeral, mensagem = config.whatsappMsg) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
