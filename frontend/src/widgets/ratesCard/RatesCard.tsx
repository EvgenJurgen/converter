import { tv } from "tailwind-variants";

import { useGetLatestRatesQuery } from "@/entities/rates";

import { Card } from "@/shared/ui";

const ratesCardStyles = tv({
  slots: {
    list: "w-full flex flex-col gap-3",
    listItem:
      "w-full h-[2rem] flex justify-between items-center border-b border-primary-foreground",
    codeWithScale: "relative inline-flex items-end",
    code: "inline-block",
    scaleWrapper: "absolute right-0 -top-2 translate-x-full",
  },
});

export default function RatesCard({ className }: { className?: string }) {
  const { list, listItem, codeWithScale, code, scaleWrapper } =
    ratesCardStyles();

  const { currentData } = useGetLatestRatesQuery("USD");

  return (
    <Card color="primary" className={className}>
      <ul className={list()}>
        {currentData?.map(({ rate, scale, currencyCode }) => (
          <li className={listItem()} key={currencyCode}>
            <div className={codeWithScale()}>
              <span className={code()}>{currencyCode}</span>
              {scale !== 1 && <span className={scaleWrapper()}>{scale}</span>}
            </div>
            <span>{rate}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
