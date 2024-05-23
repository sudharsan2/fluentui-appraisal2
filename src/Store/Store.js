import { configureStore } from "@reduxjs/toolkit";
import  themeSlice  from './ThemeSlice';
import authSlice from "./authSlice";

const store = configureStore(
    {
        reducer : {
            theme:themeSlice.reducer,
            auth: authSlice.reducer
        
        }
    }
);
export const themeActions = themeSlice.actions;
export default store;