import Entity from "../../../../class/orm/Entity";
import {RawCountryEntity} from "../../types";

export default class CountryEntity extends Entity {

    private id: number | undefined;
    private countryName: string | undefined;

    public setId(id: number): CountryEntity {
        this.id = id;
        return this;
    }

    public setCountryName(countryName: string): CountryEntity {
        this.countryName = countryName;
        return this;
    }

    public getId(): number {
        return <number>this.id;
    }

    public getCountryName(): string {
        return <string>this.countryName;
    }

    public hydrate(data: RawCountryEntity): CountryEntity {
        this.id = data.id;
        this.countryName = data.nom_pays;

        return this;
    }

    public toObject(): RawCountryEntity{

        return {
            id: this.getId(),
            nom_pays: this.getCountryName()
        };
    }

}