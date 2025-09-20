import { Converter } from "@/pages/converter";
import { Rates } from "@/pages/rates";

import ConverterIcon from "@/shared/assets/icons/converter.svg?react";
import CurrenciesIcon from "@/shared/assets/icons/currencies.svg?react";

export const ROUTE_PATHS = {
  converter: "/converter",
  rates: "/rates",
} as const;

type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

interface Route {
  route: RoutePath;
  Page: React.FC;
  name: string;
  Icon: React.FC;
}

export const ROUTES: Route[] = [
  {
    route: ROUTE_PATHS.converter,
    Page: Converter,
    name: "Currency converter",
    Icon: ConverterIcon,
  },
  {
    route: ROUTE_PATHS.rates,
    Page: Rates,
    name: "Exchange rates",
    Icon: CurrenciesIcon,
  },
];
