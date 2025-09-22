import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

import { Header } from "@/widgets/header";
import { Navigation } from "@/widgets/navigation";
import { ThemeToggle } from "@/widgets/themeToggle";

import { ROUTES } from "../routing";

const layoutStyles = tv({
  slots: {
    header: "h-[4rem] lg:h-[7rem]",
    main: "fixed top-[4rem] lg:top-[7rem] bottom-[4rem] lg:bottom-0 right-0 left-0 overflow-auto bg-secondary",
    themeToggle: "ml-auto",
    desktop: "hidden lg:flex",
    mobile: "fixed z-10 bottom-0 h-[4rem] lg:hidden",
  },
});

export default function Layout({ children }: { children: ReactNode }) {
  const { header, main, themeToggle, desktop, mobile } = layoutStyles();
  return (
    <>
      <Header className={header()}>
        <Navigation className={desktop()} routes={ROUTES} />
        <ThemeToggle className={themeToggle()} />
      </Header>
      <main className={main()}>{children}</main>
      <Navigation className={mobile()} routes={ROUTES} />
    </>
  );
}
