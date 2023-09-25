import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({ theme: "light" });

export const ThemeProvider = (props) => {
  const [data, setData] = useState({ theme: "light" });

  const toggleTheme = () => {
    setData({
      ...data,
      theme: data.theme === "light" ? "dark" : "light",
    });
  };

  return (
    <ThemeContext.Provider value={{ data, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
