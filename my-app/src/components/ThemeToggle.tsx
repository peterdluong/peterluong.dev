import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";

import { RootState } from "@/redux/store";
import { setMode } from "@/redux/slices/themeSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  const toggle = () => dispatch(setMode(theme === "dark" ? "light" : "dark"));

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn("relative", className)}
    >
      <Sun className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
