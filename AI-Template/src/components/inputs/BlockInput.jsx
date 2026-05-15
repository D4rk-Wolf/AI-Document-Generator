import { useAutoGrow } from "@/hooks/useAutoGrow.js";

export function BlockInput({ id, value, onChange, placeholder, rows, style }) {
  const ref = useAutoGrow(value);
  return (
    <textarea
      id={id}
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ display: "block", width: "100%", minHeight: `${(rows || 3) * 24}px`, overflow: "hidden", ...style }}
    />
  );
}
