import Entity from "../../../class/orm/Entity";
import {RawUserEntity} from "../types";

export default class UserEntity extends Entity {

    private id: number | undefined;
    private nom: string | undefined;
    private prenom: string | undefined;
    private password: string | undefined;
    private mail: string | undefined;
    private roles: string | Array<string> | undefined;
    private jwtKey: string | null | undefined;

    public setId(id: number): UserEntity {
        this.id = id;
        return this;
    }

    public setNom(nom: string): UserEntity {
        this.nom = nom;
        return this;
    }

    public setPrenom(prenom: string): UserEntity {
        this.prenom = prenom;
        return this;
    }

    public setRoles(roles: string): UserEntity {
        this.roles = roles;
        return this;
    }

    public setPassword(password: string): UserEntity {
        this.password = password;
        return this;
    }

    public setEmail(mail: string): UserEntity {
        this.mail = mail;
        return this;
    }

    public setJwtKey(jwtKey: string): UserEntity {
        this.jwtKey = jwtKey;
        return this;
    }

    public getId(): number {
        return <number>this.id;
    }

    public getNom(): string {
        return <string>this.nom;
    }

    public getPrenom(): string {
        return <string> this.prenom;
    }

    public getRoles(): string | Array<string> {
        return <string | Array<string>>this.roles;
    }


    public getPassword(): string {
        return <string>this.password;
    }

    public getEmail(): string {
        return <string>this.mail;
    }


    public getJwtKey(): string | null {
        return <string | null>this.jwtKey;
    }

    public hydrate(data: RawUserEntity): UserEntity {
        this.id = data.id;
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.roles = data.roles;
        this.password = data.password;
        this.mail = data.mail;
        this.jwtKey = data.jwt_key;
        
        return this;
    }

    public toObject(): RawUserEntity {
        return {
            id: this.getId(),
            nom: this.getNom(),
            prenom: this.getPrenom(),
            password: this.getPassword(),
            mail: this.getEmail(),
            roles: this.getRoles(),
            jwt_key: this.getJwtKey(),
        };
    }

}