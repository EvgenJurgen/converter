import { useEffect, useState, useCallback } from "react";

const THEME_LOCALSTORAGE_KEY = "app-theme";
const THEME_DATA_ATTRIBUTE_KEY = "data-theme";
const THEME = { light: "light", dark: "dark" };

export function useTheme() {
  const isBrowserSupportMatheMedia = () =>
    typeof window !== "undefined" && window.matchMedia;

  const getSystemTheme = () => {
    if (
      isBrowserSupportMatheMedia() &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return THEME.dark;
    }
    return THEME.light;
  };

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY);
    if (savedTheme === THEME.light || savedTheme === THEME.dark) {
      return savedTheme;
    }
    return getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute(THEME_DATA_ATTRIBUTE_KEY, theme);
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!isBrowserSupportMatheMedia()) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? THEME.dark : THEME.light);
    };
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === THEME.light ? THEME.dark : THEME.light;
      localStorage.setItem(THEME_LOCALSTORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
