import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
light:{
sidebarcolorlight: "#f0f0f0",
contentpagelight:"#ffffff",
fontcolorlight:"rgb(75,75,75)"
},
dark:{
sidebarcolordark:"rgb(33,33,33)",
contentpagedark:"rgb(20,20,20 )",
fontcolordark:"rgb(240,240,240)",
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