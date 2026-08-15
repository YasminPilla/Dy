import { useState } from "react";
import CircleButton from "./CircleButton.jsx";
import { config, waLink, whatsappGeral } from "../config.js";
import { useReveal } from "../hooks/useReveal.js";

const INITIAL = { nome: "", empresa: "", email: "", tipo: "", descricao: "" };

function montarMensagem(form) {
  const linhas = [
    "Olá! Vim pelo site e gostaria de conversar:",
    "",
    `Nome: ${form.nome}`,
    `E-mail: ${form.email}`,
  ];
  if (form.empresa.trim()) linhas.push(`Empresa: ${form.empresa.trim()}`);
  if (form.tipo) linhas.push(`Motivo do contato: ${form.tipo}`);
  if (form.descricao.trim()) linhas.push("", `Desafio: ${form.descricao.trim()}`);
  return linhas.join("\n");
}

export default function Contato() {
  const ref = useReveal();
  const [form, setForm] = useState(INITIAL);
  const [invalid, setInvalid] = useState([]);
  const [waHref, setWaHref] = useState(null);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    const errors = [];
    if (!form.nome.trim()) errors.push("nome");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.push("email");
    setInvalid(errors);
    if (errors.length) return;

    const link = waLink(whatsappGeral, montarMensagem(form));
    setWaHref(link);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  const err = (f) => (invalid.includes(f) ? { borderBottomColor: "#E06C5B" } : undefined);
  const isInvalid = (f) => invalid.includes(f);

  return (
    <section className="contato" id="contato" ref={ref}>
      <div className="wrap contato-grid">
        <div className="reveal">
          <span className="label">Vamos conversar?</span>
          <h2 className="h2">
            Existe uma oportunidade que você precisa <em>fazer acontecer?</em>
          </h2>
          <p className="sub">
            Conte o que você está tentando alcançar. Sem compromisso e com total discrição.
          </p>
          <p className="canal" style={{ marginTop: 30 }}>
            E-mail — <a href={`mailto:${config.email}`}>{config.email}</a>
          </p>
          <p className="canal">
            WhatsApp — <a href={waLink()} target="_blank" rel="noopener noreferrer">Falar com um sócio</a>
          </p>
          {config.linkedin && (
            <p className="canal">
              LinkedIn — <a href={config.linkedin} target="_blank" rel="noopener noreferrer">Perfil da empresa</a>
            </p>
          )}
        </div>

        <form className="f-row reveal" onSubmit={handleSubmit} noValidate>
          <div className="f">
            <label htmlFor="f-nome">Nome</label>
            <input
              id="f-nome"
              type="text"
              autoComplete="name"
              value={form.nome}
              onChange={set("nome")}
              style={err("nome")}
              aria-invalid={isInvalid("nome")}
              aria-describedby={isInvalid("nome") ? "f-nome-erro" : undefined}
            />
            {isInvalid("nome") && (
              <span id="f-nome-erro" className="f-erro" role="alert">Informe seu nome.</span>
            )}
          </div>
          <div className="f">
            <label htmlFor="f-email">E-mail</label>
            <input
              id="f-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
              style={err("email")}
              aria-invalid={isInvalid("email")}
              aria-describedby={isInvalid("email") ? "f-email-erro" : undefined}
            />
            {isInvalid("email") && (
              <span id="f-email-erro" className="f-erro" role="alert">Informe um e-mail válido.</span>
            )}
          </div>
          <div className="f">
            <label htmlFor="f-empresa">Empresa <span className="opcional">(opcional)</span></label>
            <input
              id="f-empresa"
              type="text"
              autoComplete="organization"
              value={form.empresa}
              onChange={set("empresa")}
            />
          </div>
          <div className="f">
            <label htmlFor="f-tipo">Como podemos ajudar? <span className="opcional">(opcional)</span></label>
            <select id="f-tipo" value={form.tipo} onChange={set("tipo")}>
              <option value="">Selecione</option>
              <option>Tenho uma oportunidade para apresentar</option>
              <option>Preciso de acesso a um cliente ou decisor</option>
              <option>Estou em uma negociação e preciso de apoio</option>
              <option>Quero entender se faz sentido conversar</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="f f--full">
            <label htmlFor="f-desc">Breve descrição do desafio <span className="opcional">(opcional)</span></label>
            <textarea id="f-desc" placeholder="Em poucas linhas, o que você está tentando alcançar." value={form.descricao} onChange={set("descricao")} />
          </div>
          <div className="f-actions">
            <CircleButton type="submit" variant="blue">Enviar pelo WhatsApp</CircleButton>
          </div>
          {waHref && (
            <div className="form-success show" role="status">
              Perfeito. <em>Abrimos o WhatsApp com sua mensagem pronta.</em>
              <small>
                Se não abriu automaticamente, <a href={waHref} target="_blank" rel="noopener noreferrer">clique aqui</a>.
              </small>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
