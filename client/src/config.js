// Configurações editáveis do site
export const config = {
  empresa: "Dy Assistent",
  whatsapp: "5511964918084", // formato: 55 + DDD + número — usado nos contatos gerais do site
  whatsappMsg:
    "Olá, gostaria de conhecer melhor o trabalho da Dy Assistent e conversar sobre uma oportunidade.",
  email: "[E-MAIL DA EMPRESA]",
  linkedin: "", // ex.: "https://www.linkedin.com/company/..." — deixe vazio para ocultar o link
  socios: [
    {
      nome: "Yasmin Pilla",
      cargo: "Sócio · Diretor",
      bio: "[EXPERIÊNCIA, SETORES E PRINCIPAIS COMPETÊNCIAS — 2 a 3 linhas.]",
      foto: null, // ex.: "/socio1.jpg" (coloque a imagem em client/public)
      whatsapp: "5511964918084",
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

export const waLink = (numero = config.whatsapp) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(config.whatsappMsg)}`;
