import { ActionTypes, DataTypes } from "./Types";

export const BillReducer = (storeData, action) => {
    switch(action.type) {
        case ActionTypes.DATA_LOAD:
            switch(action.payload.dataType) {
                case DataTypes.COMMITTEES:
                    return {
                        ...storeData,
                        [action.payload.dataType]: action.payload.data,
                        [`${action.payload.dataType}_total`]: action.payload.data.count,
                        [`${action.payload.dataType}_params`]: action.payload.params
                    };
                case DataTypes.BILLS:
                    action.payload.data.results = action.payload.data.results.map(p=> ({
                      ...p, 'subscribe': false
                      })
                    )
                    return {
                        ...storeData,
                        [action.payload.dataType]: action.payload.data,
                        [`${action.payload.dataType}_total`]: action.payload.data.count,
                        [`${action.payload.dataType}_params`]: action.payload.params
                    };
                case DataTypes.BILLS_DETAIL:
                    return {
                        ...storeData,
                        [action.payload.dataType]: action.payload.data,
                        [`${action.payload.dataType}_total`]: action.payload.data.count,
                        [`${action.payload.dataType}_params`]: action.payload.params
                    };
                case DataTypes.BILLS_COVER:
                    return {
                        ...storeData,
                        [action.payload.dataType]: action.payload.data,
                        [`${action.payload.dataType}_results`]: [...storeData[`${action.payload.dataType}_results`] || [],...action.payload.data.results],
                        [`${action.payload.dataType}_total`]: action.payload.data.count,
                        [`${action.payload.dataType}_params`]: action.payload.params
                    };

                default:
                    return storeData || {};
            }

        case ActionTypes.DATA_SET_BILL:
            let param_bill, param_bill_name;
            if (action.payload.count>0) {
              param_bill=action.payload.results[0].id
              param_bill_name=action.payload.results[0].bill
            } else {
              param_bill=-1
              param_bill_name=''
            }
            return {
                ...storeData,
                param_bill: param_bill,
                param_bill_name:param_bill_name
            };

        case ActionTypes.DATA_SET_PAGE:
            return { ...storeData, param_page: action.payload }
        case ActionTypes.DATA_SET_PAGESIZE:
            return { ...storeData, param_pageSize: action.payload }
        case ActionTypes.DATA_SET_ID:
            return { ...storeData, param_id: action.payload }
        case ActionTypes.DATA_SET_COMMITTEE:
            return { ...storeData, param_committee: action.payload }
        case ActionTypes.DATA_SET_BILLNO:
            return { ...storeData, param_billno: action.payload }
        case ActionTypes.DATA_SET_BILLSTEP:
            return { ...storeData, param_billstep: action.payload }
        case ActionTypes.DATA_SET_GENERALRESULT:
            return { ...storeData, param_generalresult: action.payload }
        case ActionTypes.DATA_SET_FINISHED:
            return { ...storeData, param_finished: action.payload }
        case ActionTypes.DATA_SET_SORT_PROPERTY:
            return { ...storeData, param_sortKey: action.payload }
        case ActionTypes.DATA_SET_SEARCH_PROPERTY:
            return { ...storeData, param_searchKey: action.payload }

        case ActionTypes.DATA_SET_DEFAULT_PARAMS:
            return {
              ...storeData,
              param_page: 1,
              param_pageSize: 10,
              param_id: '',
              param_committee: '',
              param_billno: '',
              param_billstep: '',
              param_generalresult: '',
              param_finished: '',
              param_sortKey: '',
              param_searchKey: '',
              param_bill: '',
              param_bill_name: '',
            }

        case ActionTypes.DATA_SET_CLEAR_DATASTORE:
          return {
            ...storeData,
            [action.payload.clearType]: action.payload.dataType
          }

        default:
            return storeData || {};
    }
}
