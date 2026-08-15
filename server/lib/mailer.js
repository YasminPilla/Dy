import nodemailer from "nodemailer";

let transporterPromise = null;

function isConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
    );
  }
  return transporterPromise;
}

/** Envia o e-mail do lead. Não faz nada se SMTP não estiver configurado. */
export async function sendLeadEmail(lead) {
  if (!isConfigured()) return { sent: false, reason: "smtp-not-configured" };
  const to = process.env.LEAD_TO_EMAIL;
  if (!to) return { sent: false, reason: "no-recipient" };

  const transporter = await getTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Site Dy Assistent" <${process.env.SMTP_USER}>`,
    to,
    replyTo: lead.email,
    subject: `Novo contato — ${lead.nome} (${lead.empresa})`,
    text: [
      `Nome: ${lead.nome}`,
      `Empresa: ${lead.empresa}`,
      `E-mail: ${lead.email}`,
      `WhatsApp: ${lead.whatsapp || "-"}`,
      `Tipo: ${lead.tipo || "-"}`,
      `Descrição: ${lead.descricao || "-"}`,
      `Recebido em: ${lead.recebidoEm}`,
    ].join("\n"),
  });
  return { sent: true };
}
