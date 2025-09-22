import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { cn } from "tailwind-variants/lite";

const headerStyles = tv({
  slots: {
    header: "fixed z-10 flex flex-row items-center w-full bg-primary",
    childrenWrapper:
      "flex flex-row justify-between w-full mr-10 items-center gap-35",
  },
});

interface Props {
  children?: ReactNode;
  className: string;
}

export default function Header({ children, className }: Props) {
  const { header, childrenWrapper } = headerStyles();
  return (
    <header className={cn(header(), className)}>
      <div className={childrenWrapper()}>{children}</div>
    </header>
  );
}
