import UserEntity from "./modules/user/db/UserEntity";

export type ValidateJwtToken = {
    decodedJWT: {
        id: number,
        nom: string,
        roles: string,
        jwtKey: string
    },
    token: string
}

export type ValidateJwtOutput = {
    isValid: boolean,
    credentials: UserEntity | Object
}