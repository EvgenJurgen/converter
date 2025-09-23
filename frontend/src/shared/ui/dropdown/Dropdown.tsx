import { useRef, useState, type ReactNode } from "react";
import { tv } from "tailwind-variants";

import { useClickOutside } from "@/shared/hooks";

import { Card, type CardVariants } from "../card";
import { Button, type ButtonVariants } from "../button";

const dropdownStyles = tv({
  slots: {
    wrapper: "relative",
    card: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-5 max-w-screen w-full z-10",
  },
});

export type DropdownProps = {
  children: ReactNode;
  cardVariants?: CardVariants;
  button?: ReactNode;
  buttonTitle?: string;
  buttonVariants?: ButtonVariants;
};

const DROPDOWN_DEFAULT_BUTTON_TITLE = "Dropdown";

function Dropdown({
  children,
  button,
  buttonTitle,
  buttonVariants,
  cardVariants,
}: DropdownProps) {
  const { wrapper, card } = dropdownStyles();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setIsOpen(!open));

  return (
    <div className={wrapper()} ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {button || (
          <Button {...buttonVariants}>
            {buttonTitle || DROPDOWN_DEFAULT_BUTTON_TITLE}
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className={card()} {...cardVariants}>
          {children}
        </Card>
      )}
    </div>
  );
}

Dropdown.displeyName = "Dropdown";
export default Dropdown;
