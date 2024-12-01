import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setMode } from "../redux/slices/themeSlice";

export const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        onClick={() => dispatch(setMode("light"))}
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
        <a style={{ cursor: "default" }}>Day</a>
      </div>
      <div
        onClick={() => dispatch(setMode("dark"))}
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
        <a style={{ cursor: "default" }}>Night</a>
      </div>
    </div>
  );
};
