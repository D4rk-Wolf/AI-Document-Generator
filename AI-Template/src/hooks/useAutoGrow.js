import { useRef, useEffect } from "react";

export function useAutoGrow(value) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.style.height = "auto";
      node.style.height = `${node.scrollHeight}px`;
    }
  }, [value]);
  return ref;
}
