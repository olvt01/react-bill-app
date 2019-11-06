import { DataTypes } from "./Types";

const protocol = "http";
const hostname = "localhost:8000";

export const RestUrls = {
    [DataTypes.BILLS]: `${protocol}://${hostname}/api/bill/bills/`,
    [DataTypes.BILLS_DETAIL]: `${protocol}://${hostname}/api/bill/bills_detail/`
}

export const AuthUrls = {
    [DataTypes.TOKEN]: `${protocol}://${hostname}/api/user/token/`,
    [DataTypes.MANAGEUSER]: `${protocol}://${hostname}/api/user/me/`,
    [DataTypes.CREATEUSER]: `${protocol}://${hostname}/api/user/create/`,
    [DataTypes.USER_SUBSCRIPTION]: `${protocol}://${hostname}/api/bill/subscribes/`
}
