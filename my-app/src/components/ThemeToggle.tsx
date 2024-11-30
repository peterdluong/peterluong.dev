import { useCallback, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = useCallback((theme: string) => {
    setTheme(theme);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        onClick={() => handleThemeChange("light")}
        style={{
          backgroundColor: theme === "light" ? "orange" : "gray",
          color: "white",
          width: 100,
          height: 50,
          margin: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a>Day</a>
      </div>
      <div
        onClick={() => handleThemeChange("dark")}
        style={{
          backgroundColor: theme === "dark" ? "blue" : "gray",
          color: "white",
          width: 100,
          height: 50,
          margin: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <a>Night</a>
      </div>
    </div>
  );
};
