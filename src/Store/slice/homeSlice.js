import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState: {
        url: {},
        genres: {}
    },
    reducers: {
        configurationUrl(state, action) {
            state.url = action.payload
        },
        getGenres(state, action) {
            state.genres = action.payload
        }
    }
})
export default homeSlice.reducer;
export const { configurationUrl, getGenres } = homeSlice.actions;