import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

const rootReducer = combineReducers({
  login: loginReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export { store, persistor };
