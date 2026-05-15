import { DOCS } from "@/docs.js";

export function buildDocPrompt(doc, vals) {
  let text = `# ${doc.title}\n> ${doc.purpose}\n\n`;
  doc.sections.forEach((s) => {
    text += `## ${s.title}\n`;
    const v = vals[s.id] || "";
    if (s.kind === "list") {
      const items = v.split("\n").filter((l) => l.trim());
      text += items.length > 0 ? items.map((i) => `- ${i}`).join("\n") : "(empty)";
    } else {
      text += v.trim() || "(empty)";
    }
    text += "\n\n";
  });
  return text.trim();
}

export function buildAllPrompt(allValues) {
  return DOCS.map((d) => buildDocPrompt(d, allValues[d.id] || {})).join("\n\n---\n\n");
}

export function countFilled(doc, vals) {
  return doc.sections.filter((s) => {
    const v = vals[s.id] || "";
    return s.kind === "list" ? v.split("\n").some((l) => l.trim()) : v.trim().length > 0;
  }).length;
}
