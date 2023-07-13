import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  name: "",
  email: "",
  phone: "",
};

const oneUserSlice = createSlice({
  name: "oneUser",
  initialState: initialUser,
  reducers: {
    handleInputChange(state, action) {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
    resetUser(state, action) {
      return initialUser;
    },
    editHandler(state, action) {
      return action.payload;
    },
  },
});

export const { handleInputChange, resetUser, editHandler } =
  oneUserSlice.actions;
export default oneUserSlice.reducer;
