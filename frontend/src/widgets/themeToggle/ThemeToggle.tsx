import { IconButton } from "@/shared/ui";
import { useTheme } from "./useTheme";

import MoonIcon from "@/shared/assets/icons/moon.svg?react";
import Sun from "@/shared/assets/icons/sun.svg?react";

export default function ThemeToggle({ className }: { className: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <IconButton className={className} onClick={toggleTheme}>
      {theme === "light" ? <MoonIcon /> : <Sun />}
    </IconButton>
  );
}
