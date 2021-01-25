import { useState, useEffect } from "react";
export const useTheme = () => {
  const defaultTheme = { mode: "light" };
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  };
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  const swapTheme = () => {
    if(theme.mode === "dark") {
     setTheme(defaultTheme)
    }
      else {
         setTheme({mode: "dark"})
        }
  };
  return { ...theme, swapTheme};
};
