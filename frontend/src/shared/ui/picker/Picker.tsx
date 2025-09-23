import { tv } from "tailwind-variants";

import { Dropdown } from "@/shared/ui";
import type { DropdownProps } from "../dropdown";

const pickerStyles = tv({
  slots: {
    list: "flex flex-col w-full gap-2 max-h-[10rem] overflow-auto",
    listItem: "w-full rounded-sm py-1 px-2 cursor-pointer hover:bg-secondary",
  },
  variants: {
    picked: { true: { listItem: "bg-secondary text-secondary-foreground" } },
  },
});

type Option = { name: string; value: string };

export type PickerProps = Omit<DropdownProps, "children"> & {
  options: Option[];
  pickedValues: Option["value"][];
  onPickOption: (option: Option["value"]) => unknown;
};

function Picker({
  options,
  pickedValues,
  onPickOption,
  ...dropdownOptions
}: PickerProps) {
  const { list, listItem } = pickerStyles();

  return (
    <Dropdown {...dropdownOptions}>
      <ul className={list()}>
        {options.map(({ name, value }) => (
          <li
            key={value}
            className={listItem({
              picked: pickedValues.includes(value),
            })}
            onClick={() => onPickOption(value)}
          >
            {name}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}

Picker.displayName = "Picker";
export default Picker;
