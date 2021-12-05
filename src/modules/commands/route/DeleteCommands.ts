import Api from "../../../class/hapi/Api";
import Joi from "joi";
import {Request, ResponseReturn} from "../../../class/hapi/types";
import {ResponseToolkit} from "@hapi/hapi";

export default class DeleteCommands extends Api {


    constructor() {
        super();
        this.path = '/commands';
        this.method = 'DELETE';
        this.auth = {};
        this.validate = {
            payload: Joi.object({
                id: Joi.number().required()
            })
        };
    }

    public run(request:  Request, response: ResponseToolkit): ResponseReturn {

        return response.response().code(200);
    }
}