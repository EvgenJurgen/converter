import { tv } from "tailwind-variants";

import { ConverterCard } from "@/widgets/converterCard";

const converterStyles = tv({
  slots: {
    wrapper: "min-h-full h-max-content flex justify-center items-center",
    converterCard: "w-screen max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-3",
  },
});

export default function Converter() {
  const { wrapper, converterCard } = converterStyles();
  return (
    <article className={wrapper()}>
      <ConverterCard className={converterCard()} />
    </article>
  );
}
