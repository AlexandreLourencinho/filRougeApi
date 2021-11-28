import Api from "../../../class/hapi/Api";
import {Request, ResponseReturn} from "../../../class/hapi/types";
import {ResponseToolkit} from "@hapi/hapi";
import UserTable from "../db/UserTable";
import Boom from "@hapi/boom";

export default class GetUsers extends Api {


    constructor() {
        super();
        this.path = '/users';
        this.method = 'GET';
        this.auth = {};
    }

    public run(request: Request, response: ResponseToolkit): ResponseReturn {

        const userTable = new UserTable(request.getKnex());

        return userTable.findAll()
            .then(arrayUsers => {
                if (!arrayUsers) return Boom.internal('une erreur interne est survenue lors de la récupération des utilisateurs');
               if (Array.isArray(arrayUsers)) {
                   return response.response(arrayUsers.map(user => user.toJson()));
               }
               return response.response(arrayUsers.toJson());
            });
    }
}