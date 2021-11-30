import Api from "../../../class/hapi/Api";
import Joi from "joi";
import {Request, ResponseReturn} from "../../../class/hapi/types";
import {ResponseToolkit} from "@hapi/hapi";
import UserTable from "../db/UserTable";
import UserEntity from "../db/UserEntity";
import Boom from "@hapi/boom";

export default class PutUser extends Api {

    constructor() {
        super();
        this.path = '/users';
        this.method = 'PUT';
        this.auth = {};
        this.validate = {
            payload: Joi.object({
                id: Joi.string().required(),
                nom: Joi.string().required(),
                prenom: Joi.string().required(),
                email: Joi.string().required(),
                role: Joi.string().required()
            })
        };
    }

    public run(request: Request, response: ResponseToolkit): ResponseReturn {
        // @ts-ignore
        const {id, nom, prenom, email, role} = request.payload;
        const userTable = new UserTable(request.getKnex());
        const usersEntity = new UserEntity();
        usersEntity.setId(parseInt(id))
            .setNom(nom)
            .setPrenom(prenom)
            .setEmail(email)
            .setRoles(role);
        return userTable.findOneByid(usersEntity.getId())
            .then(userEntity => {
                if (!userEntity) return Boom.internal('une erreur est survenue lors de la modification.');
                usersEntity.setPassword((userEntity as UserEntity).getPassword());
                return userTable.update(usersEntity).then(userEntity => {
                        if (!userEntity) return Boom.internal('une erreur est survenue lors de la modification.');
                        return response.response(userEntity).code(201);
                    }
                )
            })
    }
}