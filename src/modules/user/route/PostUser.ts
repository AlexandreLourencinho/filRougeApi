import Api from "../../../class/hapi/Api";
import Joi from "joi";
import {Request, ResponseReturn} from "../../../class/hapi/types";
import {ResponseToolkit} from "@hapi/hapi";
import UserTable from "../db/UserTable";
import UserEntity from "../db/UserEntity";
import {makeUid} from "../../../class/functions";
import Boom from "@hapi/boom";

export default class PostUser extends Api {

    constructor() {
        super();
        this.path = '/users';
        this.method = 'POST';
        this.auth = {};
        this.validate = {
            payload: Joi.object({
                nom: Joi.string().required(),
                prenom: Joi.string().required(),
                email: Joi.string().required(),
                role: Joi.string().required()
            })
        };
    }

    public run(request: Request, response: ResponseToolkit): ResponseReturn {
        // @ts-ignore
        const {nom, prenom, email, role} = request.payload;
        const password = makeUid(10);
        const userEntity = new UserEntity()
            .setNom(nom)
            .setPrenom(prenom)
            .setPassword(password)
            .setEmail(email)
            .setRoles(role);

        return (new UserTable()).insert(userEntity)
            .then(userEntity => {
                if (!userEntity) return Boom.internal('une erreur est survenue lors de l\'ajout.');
                return response.response(userEntity).code(201);
            })
    }
}