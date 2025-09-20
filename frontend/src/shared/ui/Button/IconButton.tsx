import React from "react";
import { cnBase, tv } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import { baseButton } from "./style";

const iconButtonVariants = tv({
  extend: baseButton,
  base: "h-max w-max text-primary-foreground [&_svg]:h-[2rem] [&_svg]:w-[2rem] lg:[&_svg]:h-[2.5rem] lg:[&_svg]:w-[2.5rem]",
});

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

function IconButton(
  { className, asChild, ...props }: IconButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cnBase(iconButtonVariants(), className)}
      ref={ref}
      {...props}
    />
  );
}
IconButton.displayName = "IconButton";
export default React.forwardRef(IconButton);
