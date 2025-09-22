import { tv } from "tailwind-variants";

import { Dropdown } from "@/shared/ui";
import type { DropdownCardVariantsProp, DropdownButtonProp } from "../dropdown";

const selectStyles = tv({
  slots: {
    list: "flex flex-col w-full gap-2 max-h-[10rem] overflow-auto",
    listItem: "w-full rounded-sm py-1 px-2 cursor-pointer hover:bg-secondary",
  },
  variants: {
    selected: { true: { listItem: "bg-secondary text-secondary-foreground" } },
  },
});

type Option = { name: string; value: string };

export type SelectProps = DropdownCardVariantsProp &
  DropdownButtonProp & {
    options: Option[];
    selectedValues: Option["value"][];
    onSelectOption: (option: Option["value"]) => unknown;
  };

function Select({
  cardVariants,
  button,
  options,
  selectedValues,
  onSelectOption,
}: SelectProps) {
  const { list, listItem } = selectStyles();

  return (
    <Dropdown cardVariants={cardVariants} button={button}>
      <ul className={list()}>
        {options.map(({ name, value }) => (
          <li
            key={value}
            className={listItem({
              selected: selectedValues.includes(value),
            })}
            onClick={() => onSelectOption(value)}
          >
            {name}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}

Select.displayName = "Select";
export default Select;
