import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ConfigProvider, theme } from "antd";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeType>(() => {
    {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme === "dark" ? "dark" : "light";
    }
  });

  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      themeMode === "light" ? "#ffffff" : "#1f1f1f";
    document.body.style.color = themeMode === "light" ? "#000000" : "#e0e0e0";

    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ theme: themeMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm:
            themeMode === "light"
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm,
          token: {
            colorBgContainer: themeMode === "light" ? "#fff" : "#333",
            colorTextBase: themeMode === "light" ? "#000" : "#ddd",
          },
        }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
