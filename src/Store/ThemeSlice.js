import { createSlice, configureStore } from "@reduxjs/toolkit";
 
const initialState = {
light:{
sidebarcolorlight: "#f0f0f0",
contentpagelight:"#ffffff"
},
dark:{
sidebarcolordark:"#242424",
contentpagedark:"#424242"
},
theme:false
};
 
const themeSlice=createSlice({
    name:'theme',
    initialState,
    reducers:{
        // darktheme(state){
        //     state.sidebarcolordark;
        //     state.contentpagedark;
        //     state.theme;
        // },
        // lighttheme(state){
        //     state.sidebarcolorlight;
        //     state.contentpagelight;
        //     state.theme;
        // },
        toggletheme(state){
            state.theme = !state.theme;
        }
    }
});
 
 
export default themeSlice;
