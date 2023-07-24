import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import userActionsReducer from "./userSlice";
const store=configureStore({
    reducer:{
        login:loginReducer,
        userActions:userActionsReducer
    },
});

export default store;
