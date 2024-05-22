import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boxReducer from "@/redux/reducerSlice/boxSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  box: boxReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: () => [logger],
});

export const persistor = persistStore(store);
