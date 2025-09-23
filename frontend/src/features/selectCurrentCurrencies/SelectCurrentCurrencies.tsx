import { useEffect, useState } from "react";
import { DEFAULT_CURRENCIES, type RateQueryCurrency } from "@/entities/rates";
import { Picker } from "@/shared/ui";
import { useGetCurrentCurrenciesQuery } from "@/entities/currencies";

export type GetCurrenciesProps = {
  setSelectedCurrencies: (currencies: RateQueryCurrency[]) => unknown;
};

const BUTTON_TITLE = "Select currency";

export default function SelectCurrentCurrencies({
  setSelectedCurrencies,
}: GetCurrenciesProps) {
  const [selectedCurrencyCodes, setSelectedCurrencyCodes] =
    useState(DEFAULT_CURRENCIES);

  useEffect(() => {
    setSelectedCurrencies(selectedCurrencyCodes);
  }, [selectedCurrencyCodes, setSelectedCurrencies]);

  const handleSelectCurrency = (currency: RateQueryCurrency) => {
    setSelectedCurrencyCodes((prev) => {
      if (!prev.includes(currency)) return [...prev, currency];
      if (!DEFAULT_CURRENCIES.includes(currency))
        return [...prev.filter((curr) => curr !== currency)];
      return prev;
    });
  };

  const { currentData } = useGetCurrentCurrenciesQuery();

  return (
    <Picker
      cardVariants={{ border: true }}
      buttonVariants={{ variant: "outline" }}
      buttonTitle={BUTTON_TITLE}
      options={
        currentData?.map(({ name, code }) => ({ name, value: code })) || []
      }
      pickedValues={selectedCurrencyCodes}
      onPickOption={(code) => handleSelectCurrency(code)}
    />
  );
}
