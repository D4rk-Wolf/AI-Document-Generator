export function ProgressDot({ pct, complete, active }) {
  return (
    <div style={{
      width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
      border: `1.5px solid ${complete ? "var(--good)" : pct > 0 ? "var(--accent)" : active ? "var(--accent)" : "var(--line-2)"}`,
      background: complete ? "var(--good)" : "transparent",
      position: "relative", overflow: "hidden",
    }}>
      {!complete && pct > 0 && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: `${pct * 100}%`,
          background: "var(--accent)",
          opacity: 0.7,
        }} />
      )}
    </div>
  );
}
