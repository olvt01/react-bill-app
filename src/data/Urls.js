import { DataTypes } from "./Types";

const protocol = "http";
const hostname = "localhost:8000";

export const RestUrls = {
    [DataTypes.BILLS]: `${protocol}://${hostname}/api/bill/bills/`,
    [DataTypes.BILLS_DETAIL]: `${protocol}://${hostname}/api/bill/bills_detail/`
}

export const authUrl = `${protocol}://${hostname}/api/user/token/`;
