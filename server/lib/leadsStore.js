import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "..", "leads.jsonl");

/** Salva o lead como uma linha JSON, mantendo um backup local mesmo sem e-mail/CRM configurado. */
export async function appendLead(lead) {
  await fs.appendFile(FILE, JSON.stringify(lead) + "\n", "utf8");
}
