import { ActionTypes, DataTypes } from "./Types";

export const BillReducer = (storeData, action) => {
    switch(action.type) {
        case ActionTypes.DATA_LOAD:
            switch(action.payload.dataType) {
                case DataTypes.BILLS:
                    action.payload.data.results = action.payload.data.results.map(p=> ({
                      ...p, 'subscribe': false
                      })
                    )
                    return {
                        ...storeData,
                        [action.payload.dataType]: action.payload.data,
                        [`${action.payload.dataType}_params`]: action.payload.params
                    };
                case DataTypes.BILLS_DETAIL:
                    return {
                        ...storeData,
                        [action.payload.dataType]: action.payload.data,
                        [`${action.payload.dataType}_params`]: action.payload.params
                    };
                default:
                    return storeData || {};

        }
        default:
            return storeData || {};
    }
}
