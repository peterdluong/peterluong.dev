import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  value: "light" | "dark";
}

const initialState: ThemeState = { value: "light" };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setToLightMode: (state) => {
      state.value = "light";
    },
    setToDarkMode: (state) => {
      state.value = "dark";
    },
    setMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.value = action.payload;
    },
  },
});

export const { setToLightMode, setToDarkMode, setMode } = themeSlice.actions;

export default themeSlice.reducer;
