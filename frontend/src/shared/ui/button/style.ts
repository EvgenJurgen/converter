import { tv } from "tailwind-variants";

export const baseButton = tv({
  base: "inline-flex align-middle w-max items-center justify-center cursor-pointer rounded-xl transition-colors whitespace-nowrap hover:no-underline focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
});
