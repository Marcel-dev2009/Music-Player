import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const isDark = theme === "dark";

  const handleClick = () => {
    const newTheme = isDark ? "light" : "dark";
    onThemeChange(newTheme);
    const html = document.documentElement;
    if (newTheme === 'dark'){
      html.classList.add('light');
    }else{
      html.classList.remove('light')
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-all duration-200 active:scale-95 focus:outline-none 
        ${isDark 
          ? "text-gray-300 hover:text-white hover:bg-gray-800 bg-gray-800" 
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-white"
        }`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Sun className="w-4 h-3 md:w-5 md:h-5  "/>
        ) : (
          <Moon className="w-4 h-3 md:w-5 md:h-5 "/>
        )}
      </motion.div>
    </button>
  );
}
