import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "tailwind-variants/lite";

const cardStyles = tv({
  base: "p-5 rounded-md w-max",
  variants: {
    color: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
    border: { true: "" },
  },
  compoundVariants: [
    {
      border: true,
      color: "primary",
      class: "border-2 border-primary-foreground",
    },
    {
      border: true,
      color: "secondary",
      class: "border border-secondary-foreground",
    },
  ],
  defaultVariants: { color: "primary", border: false },
});

export type CardVariants = VariantProps<typeof cardStyles>;

export type CardProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  CardVariants & {
    children: ReactNode;
    className?: string;
  };

function Card({ children, className, color, border, ...props }: CardProps) {
  return (
    <section
      className={cn(cardStyles({ color, border }), className)}
      {...props}
    >
      {children}
    </section>
  );
}

Card.displayName = "Card";
export default Card;
