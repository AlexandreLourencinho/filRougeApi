import Api from "../../../class/hapi/Api";
import Joi from "joi";
import {Request, ResponseReturn} from "../../../class/hapi/types";
import {ResponseToolkit} from "@hapi/hapi";
import UserTable from "../db/UserTable";
import UserEntity from "../db/UserEntity";
import Boom from "@hapi/boom";

export default class DeleteUser extends Api {

    constructor() {
        super();
        this.path = '/users';
        this.method = 'DELETE';
        this.auth = {};
        this.validate = {
            payload: Joi.object({
                id: Joi.string().required()
            })
        };
    }

    public run(request: Request, response: ResponseToolkit): ResponseReturn {
        // @ts-ignore
        const {id} = request.payload;
        const userEntity = new UserEntity().setId(id);
        return (new UserTable()).delete(userEntity)
            .then(result => {
                if (!result) return Boom.internal('une erreur est survenue lors de la suppression.');
                return response.response().code(200);
            })
    }
}