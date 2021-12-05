'use strict'
import dotenv from 'dotenv';
import {ResponseToolkit, Server} from '@hapi/hapi';
import {Request} from "./class/hapi/types";
// @ts-ignore
import hapiNowAuth from '@now-ims/hapi-now-auth';
import Logger from './class/logger/Logger';
import {ValidateJwtOutput, ValidateJwtToken} from "./types";
import {readdir} from 'fs';
import path from 'path';
import Knex from "knex";
import UserTable from "./modules/user/db/UserTable";

dotenv.config();

const knex = Knex({
    "client": "mysql",
    // "debug": true,
    "connection": {
        "host": process.env['DB_HOST'],
        "user": process.env['DB_USER'],
        "password": process.env['DB_PASSWORD'],
        "database": process.env['DB_DATABASE'],
        "charset": "utf8mb4"
    },
});

export const validateJwt = (request: Request, token: ValidateJwtToken, res: ResponseToolkit): Promise<ValidateJwtOutput | void> => {
    const {decodedJWT} = token;
    const userTable = new UserTable();
    return userTable.findOneBy({column: 'id', value: decodedJWT.id}, {
        column: 'nom',
        value: decodedJWT.nom
    }, {column: 'jwt_key', value: decodedJWT.jwtKey})
        .then(userEntity => {
            if (!userEntity) return {
                isValid: false,
                credentials: {},
            };
            return {
                isValid: true,
                credentials: userEntity,
            };
        });
};

const loadRoutes = (server: Server): void => {
    const modulePath = `${path.dirname(require.main?.filename || process.mainModule?.filename || '')}/modules`;
    readdir(modulePath, (error: any, items: Array<string>): void => {
        if (error || items.length === 0) return;
        items.forEach(module =>
            readdir(
                `${modulePath}/${module}/route`,
                (error: any, files: Array<string>): void => {
                    if (error || files.length === 0) return;
                    files.forEach(file => {
                        const {default: Route} = require(`${modulePath}/${module}/route/${file}`);
                        console.log('Route', Route);
                        server.route((new Route()).build());
                    });
                }
            )
        )
    })
};

const server = new Server({
    port: 8080, host: 'localhost', routes: {
        cors: {
            origin: ['*'],
            headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
            additionalHeaders: ['x-pseudo', 'x-password']
        }
    }
});

server.register([
    hapiNowAuth,
    {
        name: 'knex',
        version: '1.0.0',
        register: (server: Server) => server.decorate('request', 'getKnex', () => knex)
    },
    {
        name: 'log-request',
        version: '1.0.0',
        register: (server: Server) =>
            // @ts-ignore WTF TS
            server.events.on('response', (request: Request) => {
                const info = request.info;
                const response = request.response;

                const host = info.host;
                const method = request.method.toUpperCase();
                const path = request.path;
                const payload = JSON.stringify(request.query);
                const responseStatusCode = 'statusCode' in response ? response.statusCode : 'No status code';
                const responseTime = (info.completed !== undefined ? info.completed : info.responded) - info.received;
                const byName = request.auth.credentials ? request.auth.credentials.nom : 'John Doe';

                Logger.info(`${host}: ${method} ${path} ${payload} ${responseStatusCode} ${responseTime}ms (by ${byName})`);
            })
    }
])
    .then(() => {
        server.auth.strategy('jwt-strategy', 'hapi-now-auth', {
            verifyJWT: true,
            keychain: [process.env['JWT_KEYCHAIN']],
            validate: validateJwt
        });
        server.auth.default('jwt-strategy');

        loadRoutes(server);

        server.start()
            .then(() => console.log(`Server running on ${server.info.uri}`))

            .catch(Logger.catch('Es-start'));
    })
    .catch(Logger.catch('Es-register'));