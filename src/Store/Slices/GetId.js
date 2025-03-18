import { createSlice } from "@reduxjs/toolkit";

export const getIdSlice = createSlice({
  name: "getId",
  initialState: {
    id: "",
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});
export const { setId } = getIdSlice.actions;
export default getIdSlice.reducer;
