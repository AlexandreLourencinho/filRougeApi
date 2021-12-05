import Api from "../../../class/hapi/Api";
import {Request, ResponseReturn} from "../../../class/hapi/types";
import {ResponseToolkit} from "@hapi/hapi";
import CommandTable from "../db/command/CommandTable";
import Boom from "@hapi/boom";

export default class GetCommands extends Api {


    constructor() {
        super();
        this.path = '/commands';
        this.method = 'GET';
        this.auth = {};
    }

    public run(request: Request, response: ResponseToolkit): ResponseReturn {

        return (new CommandTable())
            .findAll()
            .then(arrayCommandEntity => {
                if (!arrayCommandEntity) return Boom.internal('erreur interne au serveur');
                if (Array.isArray(arrayCommandEntity)) {
                    return response.response(arrayCommandEntity.map(commandEntity => commandEntity));
                }
                return response.response(arrayCommandEntity);
            })
            .catch(() => Boom.internal('erreur interne au serveur'));
    }

}