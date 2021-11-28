import Api from "../../../class/hapi/Api";
import {Request, ResponseReturn} from "../../../class/hapi/types";
import {ResponseToolkit} from "@hapi/hapi";

export default class CheckToken extends Api {

    constructor() {
        super();
        this.path = '/check-token';
        this.method = "GET";
        this.auth = {};
    }

    public run(request: Request, response: ResponseToolkit): ResponseReturn {
        return response.response().code(204);
    }

}