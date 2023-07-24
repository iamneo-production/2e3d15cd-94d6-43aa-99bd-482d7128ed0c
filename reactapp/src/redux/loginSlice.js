import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
  name:'login',
  initialState:{
    userCreds:{
      userName:"",
      password:""
    },
    userDetails:{
      firstName:"Ash",
      lastName:"Suzuki",
      Email:"ashizuka@rakuten.org",
    },
    isLoggedin:false
  },
  reducers:{
    loginUser:(state,action)=>{
      state.userCreds=action.payload;
      state.isLoggedin=true;
    },
    logoutUser:(state)=>{
      state.userName="";
      state.isLoggedin=false;
    },
    updateUser:(state,action)=>{
      state.userDetails=action.payload;
    }
  },
});
export const {loginUser,logoutUser,updateUser}=loginSlice.actions;
export default loginSlice.reducer;