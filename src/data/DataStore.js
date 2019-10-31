import { createStore, applyMiddleware } from "redux";
import { BillReducer } from "./BillReducer";
import { asyncActions } from "./AsyncMiddleware";

export const BillAppDataStore
    = createStore(BillReducer,
        applyMiddleware(asyncActions));
