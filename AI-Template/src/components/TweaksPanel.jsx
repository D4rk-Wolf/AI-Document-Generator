import { ACCENTS } from "@/constants.js";

export function TweaksPanel({ settings, onChange, onClose }) {
  const seg = (options, key) => (
    <div style={{ display: "flex", borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--line-2)" }}>
      {options.map(([val, lbl], i) => (
        <button
          key={val}
          onClick={() => onChange({ ...settings, [key]: val })}
          style={{
            flex: 1, height: 30, fontSize: 12,
            background: settings[key] === val ? "var(--bg-3)" : "var(--bg-2)",
            color: settings[key] === val ? "var(--ink-0)" : "var(--ink-2)",
            fontWeight: settings[key] === val ? 600 : 400,
            borderRight: i < options.length - 1 ? "1px solid var(--line-2)" : "none",
          }}
        >
          {lbl}
        </button>
      ))}
    </div>
  );

  const sectionLabel = (text) => (
    <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 10, marginTop: 4 }}>
      {text}
    </div>
  );

  const fieldLabel = (text) => (
    <div style={{ fontSize: 12, color: "var(--ink-2)", marginBottom: 8 }}>{text}</div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 999 }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 248,
        background: "var(--bg-1)", borderLeft: "1px solid var(--line)",
        zIndex: 1000, display: "flex", flexDirection: "column",
        boxShadow: "-12px 0 40px rgba(0,0,0,0.35)",
      }}>
        <div style={{
          height: 48, padding: "0 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid var(--line)",
          flexShrink: 0,
        }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: "var(--ink-0)", letterSpacing: -0.2 }}>Tweaks</span>
          <button
            onClick={onClose}
            style={{
              width: 24, height: 24, borderRadius: "var(--r-xs)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--ink-3)", fontSize: 16, lineHeight: 1,
              background: "var(--bg-2)",
            }}
          >×</button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "12px 16px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            {sectionLabel("Direction")}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                ["terminal", "01 · Terminal", "TUI-forward, split pane"],
                ["compose", "02 · Compose", "Linear/Raycast-style"],
                ["manuscript", "03 · Manuscript", "Document-first canvas"],
              ].map(([val, lbl, sub]) => (
                <button
                  key={val}
                  onClick={() => onChange({ ...settings, direction: val })}
                  style={{
                    padding: "9px 12px", borderRadius: "var(--r-sm)", textAlign: "left",
                    background: settings.direction === val ? "var(--accent-soft)" : "var(--bg-2)",
                    border: `1px solid ${settings.direction === val ? "var(--accent)" : "var(--line)"}`,
                  }}
                >
                  <div style={{
                    fontSize: 12, fontFamily: "var(--font-mono)",
                    color: settings.direction === val ? "var(--accent)" : "var(--ink-1)",
                    fontWeight: settings.direction === val ? 600 : 500,
                    marginBottom: 2,
                  }}>{lbl}</div>
                  <div style={{ fontSize: 10, color: "var(--ink-3)" }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            {sectionLabel("Theme")}
            {fieldLabel("Mode")}
            {seg([["dark", "Dark"], ["light", "Light"]], "theme")}
          </div>

          <div>
            {fieldLabel("Accent")}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {ACCENTS.map((a) => {
                const isSelected = settings.accent === a.value;
                return (
                  <button
                    key={a.value}
                    onClick={() => onChange({ ...settings, accent: a.value })}
                    aria-label={`${a.label} accent${isSelected ? " (selected)" : ""}`}
                    style={{
                      width: 30, height: 30, borderRadius: "var(--r-sm)",
                      background: a.value,
                      outline: isSelected ? `2px solid var(--ink-0)` : "2px solid transparent",
                      outlineOffset: 2,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {isSelected && (
                      <span style={{ fontSize: 14, color: "#0a0a0a", fontWeight: 700, lineHeight: 1 }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {sectionLabel("Layout")}
            {fieldLabel("Sidebar")}
            <div style={{
              background: "var(--bg-2)", border: "1px solid var(--line-2)",
              borderRadius: "var(--r-sm)", padding: "0 10px", height: 34,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "relative",
            }}>
              <select
                value={settings.sidebar}
                onChange={(e) => onChange({ ...settings, sidebar: e.target.value })}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
              >
                <option value="labeled">Labeled</option>
                <option value="icons">Icons only</option>
                <option value="hidden">Hidden</option>
              </select>
              <span style={{ fontSize: 12, color: "var(--ink-1)", pointerEvents: "none" }}>
                {settings.sidebar === "labeled" ? "Labeled" : settings.sidebar === "icons" ? "Icons only" : "Hidden"}
              </span>
              <span style={{ color: "var(--ink-3)", fontSize: 11, pointerEvents: "none" }}>▾</span>
            </div>
          </div>

          <div>
            {fieldLabel("Density")}
            {seg([["compact", "Compact"], ["cozy", "Cozy"], ["comfy", "Comfy"]], "density")}
          </div>
        </div>
      </div>
    </>
  );
}
