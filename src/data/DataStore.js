import { createStore, applyMiddleware } from "redux";
import { BillReducer } from "./BillReducer";
import { CommonReducer } from "./CommonReducer";
import { asyncActions } from "./AsyncMiddleware";

export const BillAppDataStore
    = createStore(CommonReducer(BillReducer),
        applyMiddleware(asyncActions));
