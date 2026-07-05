import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

/**
 * Bridges the Redux theme slice to Tailwind's `class` dark mode by toggling the
 * `dark` class on <html>. Mount once near the app root. Renders nothing.
 */
export const ThemeSync = () => {
  const theme = useSelector((state: RootState) => state.theme.value);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
};
