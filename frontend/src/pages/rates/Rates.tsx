import { tv } from "tailwind-variants";
import { RatesCard } from "@/widgets/ratesCard";

const ratesStyles = tv({
  slots: {
    wrapper: "min-h-full h-max-content flex justify-center py-5 lg:py-10",
    ratesCard: "w-screen max-w-xs mx-3",
  },
});

export default function Rates() {
  const { wrapper, ratesCard } = ratesStyles();

  return (
    <article className={wrapper()}>
      <RatesCard className={ratesCard()} />
    </article>
  );
}
