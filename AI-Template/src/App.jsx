import { useState } from "react";

const DOCS = [
  {
    id: "prd",
    number: "01",
    label: "PRD",
    title: "Product Requirement Document",
    subtitle: "Tells AI WHAT to build",
    color: "#1a1a2e",
    accent: "#e8b84b",
    icon: "📋",
    goldenRule: "Clear PRD = 70% work already done",
    sections: [
      {
        id: "problem",
        title: "Problem Statement",
        hint: "What problem does this product solve?",
        type: "textarea",
      },
      {
        id: "targetUsers",
        title: "Target Users",
        hint: "Who is this for? Describe your primary user persona.",
        type: "textarea",
      },
      {
        id: "featuresBasic",
        title: "Feature List — Basic (MVP)",
        hint: "List core features needed at launch, one per line.",
        type: "textarea",
      },
      {
        id: "featuresAdvanced",
        title: "Feature List — Advanced (Post-MVP)",
        hint: "Nice-to-have features for later versions, one per line.",
        type: "textarea",
      },
      {
        id: "userFlow",
        title: "User Flow",
        hint: "Step-by-step journey: what does a user do from landing to goal?",
        type: "textarea",
      },
      {
        id: "techPrefs",
        title: "Tech Preferences (Optional)",
        hint: "Preferred languages, frameworks, platforms, hosting, etc.",
        type: "textarea",
      },
    ],
  },
  {
    id: "system",
    number: "02",
    label: "SYSTEM DESIGN",
    title: "System Design Document",
    subtitle: "Tells AI HOW to build",
    color: "#0d1b2a",
    accent: "#4fc3f7",
    icon: "🧠",
    goldenRule: "Clean, structured & scalable code",
    sections: [
      {
        id: "frontendArch",
        title: "Frontend Architecture",
        hint: "Framework (React, Vue, Next.js...), folder structure, state management, routing.",
        type: "textarea",
      },
      {
        id: "backendArch",
        title: "Backend Architecture",
        hint: "Language, framework (Node/Express, Django...), server structure, deployment.",
        type: "textarea",
      },
      {
        id: "apiStructure",
        title: "API Structure & Flow",
        hint: "List key API endpoints. Format: METHOD /path — description",
        type: "textarea",
      },
      {
        id: "dbSchema",
        title: "Database Schema",
        hint: "Tables/collections and their fields. e.g. Users: id, name, email, created_at",
        type: "textarea",
      },
      {
        id: "authSecurity",
        title: "Authentication & Security Flow",
        hint: "Auth method (JWT, OAuth, session), password hashing, role-based access, etc.",
        type: "textarea",
      },
    ],
  },
  {
    id: "uiux",
    number: "03",
    label: "UI/UX WIREFRAME",
    title: "UI/UX Wireframes",
    subtitle: "AI needs visual clarity",
    color: "#1b0030",
    accent: "#ce93d8",
    icon: "🎨",
    goldenRule: "Better UI clarity = Less rework later",
    sections: [
      {
        id: "keyScreens",
        title: "Key Screens",
        hint: "List screens to design: Home, Login, Dashboard, Profile, etc.",
        type: "textarea",
      },
      {
        id: "layoutIdeas",
        title: "Layout Ideas",
        hint: "Describe the layout per screen or paste Figma/sketch links.",
        type: "textarea",
      },
      {
        id: "colors",
        title: "Color Palette",
        hint: "Primary, secondary, accent, background, text colors. Hex codes preferred.",
        type: "textarea",
      },
      {
        id: "fonts",
        title: "Fonts & Typography",
        hint: "Heading font, body font, sizes, weights.",
        type: "textarea",
      },
      {
        id: "designStyle",
        title: "Design Style",
        hint: "Minimal, glassmorphism, brutalist, playful, corporate, dark-mode-first, etc.",
        type: "textarea",
      },
    ],
  },
  {
    id: "features",
    number: "04",
    label: "FEATURE BREAKDOWN",
    title: "Feature Breakdown Document",
    subtitle: "Divide big features into small tasks",
    color: "#0a1f0a",
    accent: "#69f0ae",
    icon: "✅",
    goldenRule: "Helps AI build step-by-step, like a developer",
    sections: [
      {
        id: "featureList",
        title: "Feature List",
        hint: "List all major features of the project, one per line.",
        type: "textarea",
      },
      {
        id: "breakdowns",
        title: "Feature Breakdowns",
        hint: `Break each feature into sub-tasks. Example:\n\nLogin System:\n- Email validation\n- Password encryption\n- OTP / Auth flow\n\nUser Dashboard:\n- Fetch user data\n- Display stats\n- Edit profile`,
        type: "textarea",
      },
      {
        id: "priority",
        title: "Priority Order",
        hint: "Rank features: P1 (critical), P2 (important), P3 (nice-to-have).",
        type: "textarea",
      },
      {
        id: "dependencies",
        title: "Dependencies",
        hint: "Which features depend on others? e.g. Dashboard requires Auth to be done first.",
        type: "textarea",
      },
    ],
  },
  {
    id: "master",
    number: "05",
    label: "MASTER PROMPT",
    title: "Master Prompt Document",
    subtitle: "Your secret weapon",
    color: "#1a0a00",
    accent: "#ffb300",
    icon: "⚡",
    goldenRule: "This decides: Random code ❌ OR Production-ready output ✅",
    sections: [
      {
        id: "projectOverview",
        title: "Project Overview",
        hint: "One paragraph summary of the entire project for the AI.",
        type: "textarea",
      },
      {
        id: "strictInstructions",
        title: "Strict Instructions",
        hint: "Rules AI must follow. e.g. Never use inline styles. Always add comments. Never skip error handling.",
        type: "textarea",
      },
      {
        id: "techStack",
        title: "Tech Stack",
        hint: "Full stack list: Frontend, Backend, Database, Auth, Hosting, APIs, etc.",
        type: "textarea",
      },
      {
        id: "codeStyle",
        title: "Code Style Guidelines",
        hint: "Naming conventions, file structure, commenting style, linting rules.",
        type: "textarea",
      },
      {
        id: "outputFormat",
        title: "Output Format",
        hint: "How should AI output code? File names, folder structure, what to include in each response.",
        type: "textarea",
      },
    ],
  },
];

function DocCard({ doc, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${doc.color}, #000)`
          : "rgba(255,255,255,0.04)",
        border: `2px solid ${isActive ? doc.accent : "rgba(255,255,255,0.08)"}`,
        borderRadius: "14px",
        padding: "18px 20px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.25s ease",
        color: "#fff",
        width: "100%",
        boxShadow: isActive ? `0 0 24px ${doc.accent}40` : "none",
      }}
    >
      <div style={{ fontSize: "22px", marginBottom: "6px" }}>{doc.icon}</div>
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "2px",
          color: doc.accent,
          fontFamily: "monospace",
          marginBottom: "4px",
        }}
      >
        #{doc.number}
      </div>
      <div
        style={{
          fontSize: "13px",
          fontWeight: "700",
          fontFamily: "'Georgia', serif",
          lineHeight: 1.3,
        }}
      >
        {doc.label}
      </div>
    </button>
  );
}

function DocumentForm({ doc, values, onChange, onCopy, copied }) {
  const exportText = () => {
    let text = `# ${doc.title}\n`;
    text += `> ${doc.subtitle}\n\n`;
    doc.sections.forEach((s) => {
      text += `## ${s.title}\n${values[s.id] || "(empty)"}\n\n`;
    });
    text += `---\n💡 ${doc.goldenRule}`;
    return text;
  };

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${doc.color} 0%, #050505 100%)`,
          borderRadius: "20px",
          padding: "32px 36px",
          marginBottom: "24px",
          border: `1px solid ${doc.accent}30`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `${doc.accent}12`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "3px",
            color: doc.accent,
            fontFamily: "monospace",
            marginBottom: "8px",
          }}
        >
          DOCUMENT #{doc.number} — {doc.label}
        </div>
        <h2
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(22px, 3vw, 34px)",
            fontWeight: "900",
            color: "#fff",
            margin: "0 0 8px",
          }}
        >
          {doc.icon} {doc.title}
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontStyle: "italic",
            margin: 0,
            fontSize: "15px",
          }}
        >
          {doc.subtitle}
        </p>
      </div>

      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {doc.sections.map((section) => (
          <div
            key={section.id}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              padding: "22px 24px",
              transition: "border-color 0.2s",
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: doc.accent,
                marginBottom: "10px",
                fontFamily: "monospace",
              }}
            >
              ✦ {section.title}
            </label>
            <textarea
              value={values[section.id] || ""}
              onChange={(e) => onChange(section.id, e.target.value)}
              placeholder={section.hint}
              rows={5}
              style={{
                width: "100%",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "14px 16px",
                color: "#e8e8e8",
                fontSize: "14px",
                lineHeight: "1.7",
                fontFamily: "'Courier New', monospace",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = `${doc.accent}80`)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.08)")
              }
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "28px",
          padding: "20px 24px",
          background: `${doc.accent}10`,
          border: `1px solid ${doc.accent}30`,
          borderRadius: "14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: doc.accent,
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          👉 {doc.goldenRule}
        </p>
        <button
          onClick={() => onCopy(exportText())}
          style={{
            background: doc.accent,
            color: "#000",
            border: "none",
            borderRadius: "8px",
            padding: "10px 22px",
            fontWeight: "800",
            fontSize: "13px",
            cursor: "pointer",
            letterSpacing: "0.5px",
            transition: "opacity 0.2s",
          }}
        >
          {copied ? "✓ Copied!" : "Copy as Prompt"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeDoc, setActiveDoc] = useState(0);
  const [allValues, setAllValues] = useState({});
  const [copied, setCopied] = useState(false);

  const docValues = allValues[DOCS[activeDoc].id] || {};

  const handleChange = (fieldId, value) => {
    setAllValues((prev) => ({
      ...prev,
      [DOCS[activeDoc].id]: {
        ...prev[DOCS[activeDoc].id],
        [fieldId]: value,
      },
    }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const doc = DOCS[activeDoc];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#fff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        padding: "0",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "2px",
            fontWeight: "700",
          }}
        >
          D4RKWOLF
        </span>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "1.5px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "monospace",
          }}
        >
          STUDIOS
        </span>
        <span
          style={{
            width: "1px",
            height: "16px",
            background: "rgba(255,255,255,0.15)",
          }}
        />
        <span
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            fontWeight: "500",
          }}
        >
          AI Project Document Templates
        </span>
        <span style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
          Build these 5 docs before prompting AI
        </span>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 57px)" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "200px",
            minWidth: "200px",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.25)",
              marginBottom: "8px",
              paddingLeft: "4px",
            }}
          >
            DOCUMENTS
          </div>
          {DOCS.map((d, i) => (
            <DocCard
              key={d.id}
              doc={d}
              isActive={activeDoc === i}
              onClick={() => setActiveDoc(i)}
            />
          ))}

          <div
            style={{
              marginTop: "auto",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              fontSize: "9px",
              letterSpacing: "1.5px",
              color: "rgba(255,255,255,0.18)",
              fontFamily: "monospace",
              textAlign: "center",
            }}
          >
            D4RKWOLF STUDIOS
          </div>
        </div>

        {/* Main */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "32px",
            display: "flex",
            gap: "24px",
          }}
        >
          <DocumentForm
            doc={doc}
            values={docValues}
            onChange={handleChange}
            onCopy={handleCopy}
            copied={copied}
          />
        </div>
      </div>
    </div>
  );
}
