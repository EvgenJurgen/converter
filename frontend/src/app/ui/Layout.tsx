import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

import { Header } from "@/widgets/header";
import { Navigation } from "@/widgets/navigation";
import { ThemeToggle } from "@/widgets/themeToggle";

const layoutStyles = tv({
  slots: {
    wrapper: "min-h-full flex flex-col",
    header: "h-[4rem] lg:h-[7rem]",
    main: "flex-auto h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)] mt-[4rem] lg:mt-[7rem] mb-[4rem] lg:mb-0",
    themeToggle: "ml-auto",
    desktop: "hidden lg:flex",
    mobile: "fixed z-10 bottom-0 h-[4rem] lg:hidden",
  },
});

export default function Layout({ children }: { children: ReactNode }) {
  const { wrapper, header, main, themeToggle, desktop, mobile } =
    layoutStyles();
  return (
    <div className={wrapper()}>
      <Header className={header()}>
        <Navigation className={desktop()} />
        <ThemeToggle className={themeToggle()} />
      </Header>
      <main className={main()}>{children}</main>
      <Navigation className={mobile()} />
    </div>
  );
}
