import { type GetCurrenciesResponse } from "@/entities/currencies";

import type { RateQueryCurrency } from "@/entities/rates";
import { Button, Select } from "@/shared/ui";

export type GetCurrenciesProps = {
  currencies: GetCurrenciesResponse;
  selectedCurrencyCodes: RateQueryCurrency[];
  onSelectCurrency: (currency: RateQueryCurrency) => unknown;
};

const BUTTON_TITLE = "Select currency";

export default function SelectCurrencies({
  currencies,
  selectedCurrencyCodes,
  onSelectCurrency,
}: GetCurrenciesProps) {
  return (
    <Select
      cardVariants={{ color: "primary", border: true }}
      button={
        <Button color="primary" variant="outline">
          {BUTTON_TITLE}
        </Button>
      }
      options={currencies.map(({ name, code }) => ({ name, value: code }))}
      selectedValues={selectedCurrencyCodes}
      onSelectOption={(code) => onSelectCurrency(code)}
    />
  );
}
