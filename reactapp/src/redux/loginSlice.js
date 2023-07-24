import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userDetails: {},
    token: "",
    isLoggedin: false
  },
  reducers: {
    loginUser: (state, action) => {
      state.userDetails = action.payload;
      state.isLoggedin = true;
    },
    logoutUser: (state) => {
      state.userDetails={};
      state.token="";
      state.isLoggedin = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { loginUser, logoutUser, setToken } = loginSlice.actions;
export default loginSlice.reducer;
