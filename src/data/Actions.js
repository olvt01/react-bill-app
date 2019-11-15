import { ActionTypes } from "./Types";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();

export const loadData = (dataType, params) => (
  {
    type: ActionTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType, params).then(response =>
      ({ dataType,
        data: response.data,
        params
      })
    )
  })

export const loadUserSubscription = (dataType, subscription) => (
  {
    type: ActionTypes.SET_SUBSCRIPTION,
    payload: ({
      dataType,
      data: subscription
    })
  })

export const updateUserSubscription = (subscription) => (
  {
    type: ActionTypes.UPDATE_SUBSCRIPTION,
    payload: ({
      data: subscription
    })
  })

export const deleteUserSubscription = (subscription) => (
  {
    type: ActionTypes.DELETE_SUBSCRIPTION,
    payload: ({
      data: subscription
    })
  })
// export const resetUserSubscription = (dataType, data) => (
//   {
//     type: Action.Types.RESET_SUBSCRIPTION,
//     payload: {
//       dataType
//     }
//   }
// )
