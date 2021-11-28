import {Request as HapiRequest, ResponseObject} from "@hapi/hapi";
import Knex from "knex";

export interface Request extends HapiRequest {
    getKnex(): Knex
}

export type ResponseBoom = {};

export type ResponseReturn = ResponseObject | ResponseBoom | Promise<ResponseObject | ResponseBoom>