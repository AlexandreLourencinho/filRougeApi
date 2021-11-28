import {ResponseToolkit, RouteOptions, RouteOptionsAccess, RouteOptionsValidate, ServerRoute, Util} from "@hapi/hapi";
import {Request, ResponseReturn} from "./types";

export default class Api {

    protected path: string | undefined;
    protected method: Util.HTTP_METHODS_PARTIAL | Array<Util.HTTP_METHODS_PARTIAL> | undefined;
    protected options: RouteOptions = {};
    protected validate: RouteOptionsValidate | null = null;
    protected auth: false | null | string | RouteOptionsAccess = null;

    public build(): ServerRoute {
        if (!this.path || !this.method) throw new Error("Path and method have to be defined");
        return {
            path: this.path,
            method: this.method,
            options: {
                ...(this.validate !== null ? {validate: this.validate} : {}),
                ...(this.auth !== null ? {auth: this.auth} : {}),
                ...this.options,
            },
            handler: this.run.bind(this),
        };
    }

    public run(request: Request, response: ResponseToolkit): ResponseReturn {
        return response.response('Route was not implemented yet')
    }

}