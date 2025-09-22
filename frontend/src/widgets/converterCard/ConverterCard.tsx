import { useState } from "react";
import { tv } from "tailwind-variants";
import { cn } from "tailwind-variants/lite";

import { useGetCurrentCurrenciesQuery } from "@/entities/currencies";
import { DEFAULT_CURRENCIES, type RateQueryCurrency } from "@/entities/rates";

import { ConvertCurrencies } from "@/features/convertCurrencies";
import { SelectCurrencies } from "@/features/selectCurrencies";

import { Card } from "@/shared/ui";

const card = tv({
  base: "flex flex-col h-min justify-center items-center gap-10",
});

export default function ConverterCard({ className }: { className?: string }) {
  const [selectedCurrencyCodes, setSelectedCurrencyCodes] =
    useState(DEFAULT_CURRENCIES);

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
    <Card className={cn(card(), className)}>
      <ConvertCurrencies currencies={selectedCurrencyCodes} />
      <SelectCurrencies
        currencies={currentData || []}
        selectedCurrencyCodes={selectedCurrencyCodes}
        onSelectCurrency={handleSelectCurrency}
      />
    </Card>
  );
}
