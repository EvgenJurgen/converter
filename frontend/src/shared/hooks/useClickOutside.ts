import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  onClickOutside: (...args: unknown[]) => unknown
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target;
      if (
        ref.current &&
        target instanceof Node &&
        !ref.current.contains(target)
      ) {
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, ref]);

  return ref;
}
