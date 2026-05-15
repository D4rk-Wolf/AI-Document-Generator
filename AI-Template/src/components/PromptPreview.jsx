import { buildDocPrompt } from "@/utils/prompt.js";

export function PromptPreview({ doc, vals }) {
  const text = buildDocPrompt(doc, vals);
  return (
    <pre style={{ margin: 0, fontFamily: "var(--font-mono)", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.7 }}>
      {text.split("\n").map((ln, i) => {
        if (ln.startsWith("# ")) return <div key={i} style={{ color: "var(--accent)", fontWeight: 600 }}>{ln}</div>;
        if (ln.startsWith("## ")) return <div key={i} style={{ color: "var(--info)", marginTop: 8, fontWeight: 500 }}>{ln}</div>;
        if (ln === "(empty)") return <div key={i} style={{ color: "var(--ink-4)", fontStyle: "italic" }}>{ln}</div>;
        if (ln.startsWith("- ")) return <div key={i} style={{ color: "var(--ink-2)", paddingLeft: 4 }}>{ln}</div>;
        if (ln.startsWith(">")) return <div key={i} style={{ color: "var(--ink-3)", fontStyle: "italic" }}>{ln}</div>;
        return <div key={i} style={{ color: "var(--ink-1)" }}>{ln}</div>;
      })}
    </pre>
  );
}
