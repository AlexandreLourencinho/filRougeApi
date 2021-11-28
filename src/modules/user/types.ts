export type RawUserEntity = {
    id: number,
    nom: string,
    prenom: string,
    password: string,
    mail: string,
    roles: string | Array<string>,
    jwt_key: string | null,
};