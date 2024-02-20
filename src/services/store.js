import { configureStore} from "@reduxjs/toolkit";

import { articelAPi } from "./article";

export const store = configureStore({
    reducer:{
        [articelAPi.reducerPath]: articelAPi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articelAPi.middleware)
});