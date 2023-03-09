import homeSlice from "./slice/homeSlice";

import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
    reducer: {
        home: homeSlice
    }
})
export default Store