export function LineInput({ id, value, onChange, placeholder, style }) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ display: "block", width: "100%", ...style }}
    />
  );
}
