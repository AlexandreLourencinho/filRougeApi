import Api from "../../../class/hapi/Api";
import Joi from 'joi';
import Boom from '@hapi/boom';
import {Request, ResponseReturn} from "../../../class/hapi/types";
import {ResponseToolkit} from "@hapi/hapi";
import UserTable from "../db/UserTable";
import {makeUid} from "../../../class/functions";
import * as jwt from "jsonwebtoken";
import UserEntity from "../db/UserEntity";

export default class Auth extends Api {

    constructor() {
        super();
        this.path = '/auth';
        this.method = 'POST';
        this.options = {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
            }
        }
        this.validate = {
            payload: Joi.object({
                nom: Joi.string().required(),
                mail: Joi.string().required(),
                password: Joi.string().required()
            })
        };
        this.auth = false;
    }

    public run(request: Request, response: ResponseToolkit): ResponseReturn {
        // @ts-ignore
        const {nom, mail, password} = request.payload;
        const userTable = new UserTable(request.getKnex());

        return userTable
            .findOneBy({column: 'nom', value: nom},{column: 'mail', value: mail}, {column: 'password', value: password})
            // @ts-ignore
            .then((userEntity: UserEntity | void) => {
                if (!userEntity) return Boom.unauthorized("User doesn't exist");
                console.log('userEntity', userEntity);
                const jwtKey = makeUid(20);
                const user = { id: userEntity.getId(), nom: userEntity.getNom(), roles: userEntity.getRoles()};
                const token = jwt.sign(
                    {...user, jwtKey},
                    process.env['JWT_KEYCHAIN'] as string,
                    {expiresIn: 15 * 6000},
                );

                userEntity.setJwtKey(jwtKey);
                return userTable.update(userEntity)
                    .then(() => response.response({token, user}))
                    .catch(() => Boom.internal('Internal error'));
            })
            .catch(() => Boom.internal('Internal error'));
    }

}