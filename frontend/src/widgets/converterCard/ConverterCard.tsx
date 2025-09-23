import { tv } from "tailwind-variants";
import { cn } from "tailwind-variants/lite";

import { ConvertCurrencies } from "@/features/convertCurrencies";
import { SelectCurrentCurrencies } from "@/features/selectCurrentCurrencies";

import { Card } from "@/shared/ui";
import { useCallback, useState } from "react";
import type { RateQueryCurrency } from "@/entities/rates";

const card = tv({
  base: "flex flex-col h-min justify-center items-center gap-10",
});

export default function ConverterCard({ className }: { className?: string }) {
  const [selectedCurrencies, setSelectedCurrecies] = useState<
    RateQueryCurrency[]
  >([]);

  const handleSetSelectedCurrencies = useCallback(
    (currencies: RateQueryCurrency[]) => {
      setSelectedCurrecies(currencies);
    },
    [setSelectedCurrecies]
  );

  return (
    <Card className={cn(card(), className)}>
      <ConvertCurrencies currencies={selectedCurrencies} />
      <SelectCurrentCurrencies
        setSelectedCurrencies={handleSetSelectedCurrencies}
      />
    </Card>
  );
}
