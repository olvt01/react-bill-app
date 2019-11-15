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
                    let subscription = storeData[DataTypes.BILLS].results.filter(p=>
                      p.id == action.payload.data.results[0].billid
                    )[0].subscribe;
                    action.payload.data.subscription = subscription;
                    // console.log(`DataTypes.BILLS_DETAIL action.payload.data.subscription`);
                    // console.log(action.payload.data.subscription);
                    // console.log(`DataTypes.BILLS_DETAIL action.payload.data:`);
                    // console.log(action.payload.data);

                    return {
                        ...storeData,
                        [action.payload.dataType]: action.payload.data,
                        [`${action.payload.dataType}_params`]: action.payload.params
                    };
                default:
                    return storeData || {};

            }

        case ActionTypes.SET_SUBSCRIPTION:
            console.log('DATASTORE:');
            console.log(storeData[DataTypes.BILLS].results[0]);
            storeData[DataTypes.BILLS].results = storeData[DataTypes.BILLS].results.map(p=>{
                let i, subscription = false;
                for (i in action.payload.data) {
                  if (p.id == action.payload.data[i].bill_id) {
                    subscription = true;
                  }
                }
                return {
                  ...p, 'subscribe': subscription
                };
              });
            return {
                ...storeData,
                [action.payload.dataType]: action.payload.data,
                [DataTypes.BILLS]: storeData[DataTypes.BILLS],
            };

        case ActionTypes.UPDATE_SUBSCRIPTION:
            storeData[DataTypes.BILLS].results = storeData[DataTypes.BILLS].results.map(p=>{
                let subscription = p.subscription;
                if (p.id === action.payload.data.bill_id) {
                    subscription = true;
                  }
                return {
                  ...p, 'subscribe': subscription
                };
            });
            console.log('UPDATE before storeData[DataTypes.USER_SUBSCRIPTION]');
            console.log(storeData[DataTypes.USER_SUBSCRIPTION]);
            storeData[DataTypes.BILLS_DETAIL].subscription = true;
            storeData[DataTypes.USER_SUBSCRIPTION] = [
              ...storeData[DataTypes.USER_SUBSCRIPTION],
              {
                id: action.payload.data.id,
                bill_id: action.payload.data.bill_id
              }
            ]
            console.log('UPDATE storeData[DataTypes.USER_SUBSCRIPTION]');
            console.log(storeData[DataTypes.USER_SUBSCRIPTION]);
            return {
                ...storeData,
                [DataTypes.BILLS]: storeData[DataTypes.BILLS],
                [DataTypes.BILLS_DETAIL]: storeData[DataTypes.BILLS_DETAIL],
                [DataTypes.USER_SUBSCRIPTION]: storeData[DataTypes.USER_SUBSCRIPTION]
            };

        case ActionTypes.DELETE_SUBSCRIPTION:
            storeData[DataTypes.BILLS].results = storeData[DataTypes.BILLS].results.map(p=>{
                let subscription = p.subscription;
                if (p.id == action.payload.data) {
                    subscription = false;
                  }
                return {
                  ...p, 'subscribe': subscription
                };
            });
            console.log('action.payload.data');
            console.log(action.payload.data);
            console.log('BEFORE storeData[DataTypes.USER_SUBSCRIPTION]');
            console.log(storeData[DataTypes.USER_SUBSCRIPTION]);

            storeData[DataTypes.BILLS_DETAIL].subscription = false;
            storeData[DataTypes.USER_SUBSCRIPTION]=storeData[DataTypes.USER_SUBSCRIPTION].filter(item=>{
              if (action.payload.data.bill_id===item.bill_id) {
                return false;
              }
              return true;
            });
            console.log('storeData[DataTypes.USER_SUBSCRIPTION]');
            console.log(storeData[DataTypes.USER_SUBSCRIPTION]);
            return {
                ...storeData,
                [DataTypes.BILLS]: storeData[DataTypes.BILLS],
                [DataTypes.BILLS_DETAIL]: storeData[DataTypes.BILLS_DETAIL],
                [DataTypes.USER_SUBSCRIPTION]: storeData[DataTypes.USER_SUBSCRIPTION]
            };

        case ActionTypes.RESET_SUBSCRIPTION:
            return {
                ...storeData,
                [action.payload.dataType]: {}
            };

        default:
            return storeData || {};
    }
}
