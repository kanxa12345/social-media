import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  height: 40,
  width: 40,
  backgroundColor: "red",
  borderRadius: "0%",
  area: 0,
};

const boxSlice = createSlice({
  name: "box",
  initialState,
  reducers: {
    increaseArea: (state) => {
      state.height += 5;
      state.width += 5;
      return state;
    },
    changeShape: (state) => {
      state.borderRadius = state.borderRadius === "0%" ? "50%" : "0%";
      return state;
    },
    calculateArea: (state) => {
      state.area =
        state.borderRadius === "0%"
          ? state.width * state.height
          : Math.PI * (state.width / 2) ** 2;
      return state;
    },
  },
});
export const { increaseArea, changeShape, calculateArea } = boxSlice.actions;
export default boxSlice.reducer;
