import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "tailwind-variants/lite";
import { baseButton } from "./style";

const buttonStyles = tv({
  extend: baseButton,
  base: cn(
    "h-[2.5rem] px-[2rem] text-sm font-medium",
    "sm:h-[2.7rem] sm:px-[2.2rem] sm:text-base",
    "md:h-[3rem] md:px-[2.5rem] md:text-lg",
    "lg:h-[3.5rem] lg:px-[3rem]"
  ),
  variants: {
    variant: { outline: "border", filled: "" },
    color: { primary: "", secondary: "" },
  },
  compoundVariants: [
    {
      variant: "filled",
      color: "primary",
      class: "bg-primary text-primary-foreground",
    },
    {
      variant: "filled",
      color: "secondary",
      class: "bg-secondary text-secondary-foreground",
    },
    {
      variant: "outline",
      color: "primary",
      class: "bg-transparent border-primary-foreground text-primary-foreground",
    },
    {
      variant: "outline",
      color: "secondary",
      class:
        "bg-transparent border-secondary-foreground text-secondary-foreground",
    },
  ],
  defaultVariants: { variant: "filled", color: "primary" },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  color,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonStyles({
          variant,
          color,
        }),
        className
      )}
      {...props}
    />
  );
}

Button.displayName = "Button";
export default Button;
