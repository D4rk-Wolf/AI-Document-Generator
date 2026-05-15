export function KBD({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 18, height: 18, padding: "0 4px",
      borderRadius: 4, border: "1px solid var(--line-2)",
      color: "var(--ink-3)", fontSize: 10, fontFamily: "var(--font-mono)",
    }}>
      {children}
    </span>
  );
}
