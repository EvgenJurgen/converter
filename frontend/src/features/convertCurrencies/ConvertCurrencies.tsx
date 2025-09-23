import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import {
  useLazyConvertCurrencyQuery,
  type RateQueryCurrency,
} from "@/entities/rates";
import { Input } from "@/shared/ui";

const currenciesFields = tv({
  base: "w-full flex flex-col justify-center items-center gap-2",
});

export default function ConvertCurrencies({
  currencies,
}: {
  currencies: RateQueryCurrency[];
}) {
  const [amount, setAmount] = useState("1");
  const [baseCurrency, setBaseCurrency] = useState<RateQueryCurrency | null>(
    null
  );

  useEffect(() => {
    if (
      !baseCurrency &&
      currencies.map((currency) => currency.toUpperCase()).includes("USD")
    ) {
      setBaseCurrency("USD");
    }
  }, [currencies, baseCurrency]);

  const [convert, { currentData, error }] = useLazyConvertCurrencyQuery();

  useEffect(() => {
    if (baseCurrency && currencies.length) {
      convert({ from: baseCurrency, to: currencies, amount });
    }
  }, [currencies, amount, baseCurrency, convert]);

  const handleInputChange = (currency: RateQueryCurrency, value: string) => {
    setBaseCurrency(currency);
    setAmount(value);
  };

  const getResultValue = (currency: RateQueryCurrency) => {
    if (currency === baseCurrency) return amount;
    if (currentData && currency in currentData) return currentData[currency];
    return "";
  };

  const getErrorMessage = (currency: RateQueryCurrency) => {
    if (!error) return null;
    if (currency !== baseCurrency) return null;
    if (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data
    )
      return error.data.message as string;
    return "An unexpected error occurred";
  };

  return (
    <section className={currenciesFields()}>
      {currencies.map((currency) => (
        <Input
          key={currency}
          type="number"
          value={getResultValue(currency)}
          onChange={(e) => handleInputChange(currency, e.target.value)}
          error={getErrorMessage(currency)}
          label={currency}
        />
      ))}
    </section>
  );
}
