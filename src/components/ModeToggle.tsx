import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { useTheme } from "./ThemeProvider";

interface ModeToggleProps {}

export const ModeToggle: React.FC<ModeToggleProps> = () => {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";

  const handleToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">
        {isDarkMode ? (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        )}
      </span>
      <Switch checked={isDarkMode} onClick={handleToggle} />
    </div>
  );
};
