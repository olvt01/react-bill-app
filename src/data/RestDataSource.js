import Axios from "axios";
import { RestUrls, AuthUrls } from "./Urls";

export class RestDataSource {

    constructor(err_handler) {
        this.error_handler = err_handler || (() => {});
    }

    GetData = (dataType, params) =>
        this.SendRequest("get", RestUrls[dataType], params);

    StoreData = (dataType, data) =>
        this.SendRequest("post", RestUrls[dataType], {}, data);

    SendRequest = (method, url, params, data) =>
        Axios.request({ method, url, params, data });

    AuthData = (dataType, params, token) =>
        this.SendAuthRequest("get", dataType, params, token);
}
