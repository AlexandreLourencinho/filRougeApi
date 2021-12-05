import Entity from "../../../../class/orm/Entity";
import UserEntity from "../../../user/db/UserEntity";
import CountryEntity from "../country/CountryEntity";
import {RawDeliveryAddressEntity, RawHydrateDeliveryAddressEntity} from "../../types";

export default class DeliveryAddressEntity extends Entity {

    private id: number | undefined;
    private city: string | undefined;
    private address: string | undefined;
    private postalCode: string | undefined;
    private user: UserEntity | undefined;
    private country: CountryEntity | undefined;

    public setId(id: number): DeliveryAddressEntity {
        this.id = id;
        return this;
    }

    public setCity(city: string): DeliveryAddressEntity {
        this.city = city;
        return this;
    }

    public setAddress(address: string): DeliveryAddressEntity {
        this.address = address;
        return this;
    }

    public setPostalCode(postalCode: string): DeliveryAddressEntity {
        this.postalCode = postalCode;
        return this;
    }

    public setUser(user: UserEntity): DeliveryAddressEntity {
        this.user = user;
        return this;
    }

    public setCountry(country: CountryEntity): DeliveryAddressEntity {
        this.country = country;
        return this;
    }

    public getId(): number {
        return <number>this.id;
    }

    public getCity(): string {
        return <string>this.city;
    }

    public getAddress(): string {
        return <string>this.address;
    }

    public getPostalCode(): string {
        return <string>this.postalCode;
    }

    public getUser(): UserEntity {
        return <UserEntity>this.user;
    }

    public getCountry(): CountryEntity {
        return <CountryEntity>this.country;
    }


    public hydrate(data: RawHydrateDeliveryAddressEntity): DeliveryAddressEntity {
        this.id = data.adresse_livraison.id;
        this.address = data.adresse_livraison.adresse_livraison;
        this.user = (new UserEntity().hydrate(data.utilisateurs));
        this.country = (new CountryEntity().hydrate(data.pays));
        this.postalCode = data.adresse_livraison.code_postal_livraison;
        this.city = data.adresse_livraison.ville_livr;


        return this;
    }

    public toObject(): RawDeliveryAddressEntity {

        return {
            id: this.getId(),
            pays_id: this.getCountry().getId(),
            code_postal_livraison: this.getPostalCode(),
            utilisateur_id: this.getUser().getId(),
            adresse_livraison: this.getAddress(),
            ville_livr: this.getCity()
        };
    }


}