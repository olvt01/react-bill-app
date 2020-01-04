import { DataTypes } from "./Types";
import { ActionTypes } from "./Types";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();

export const loadData = (dataType, params) => {
  return {
    type: ActionTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType, params).then(response =>
      ({ dataType,
        data: response.data,
        params
      })
    )
  }}

export const setBill = (bill) => ({
    type: ActionTypes.DATA_SET_BILL,
    payload: dataSource.GetData(DataTypes.BILLS, {bill: bill})
      .then(response => response.data)
  })

export const setParams = (actionType, newParam) =>
    ({ type: actionType, payload: newParam});

export const setDefaultParams = () =>
    ({ type: ActionTypes.DATA_SET_DEFAULT_PARAMS });

export const setClearDataStore = (clearType, dataType) => ({
  type: ActionTypes.DATA_SET_CLEAR_DATASTORE,
  payload: {
    clearType: clearType,
    dataType: dataType
  }
});
