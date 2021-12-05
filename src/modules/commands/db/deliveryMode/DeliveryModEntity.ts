import Entity from "../../../../class/orm/Entity";
import {RawDeliveryModeEntity} from "../../types";

export default class DeliveryModEntity extends Entity {

    private id: number | undefined;
    private modeName: string | undefined;
    private label: string | undefined;
    private averageDeliveryTime: number | undefined;

    public setId(id: number): DeliveryModEntity {
        this.id = id;
        return this;
    }

    public setModeName(modeName: string): DeliveryModEntity {
        this.modeName = modeName;
        return this;
    }

    public setLabel(label: string): DeliveryModEntity {
        this.label = label;
        return this;
    }

    public setAverageDeliveryTime(averageDeliveryTime: number): DeliveryModEntity {
        this.averageDeliveryTime = averageDeliveryTime;
        return this;
    }

    public getId(): number {
        return <number>this.getId();
    }

    public getModeName(): string {
        return <string>this.modeName;
    }

    public getLabel(): string {
        return <string>this.label;
    }

    public getAverageDelieryTime(): number {
        return <number>this.averageDeliveryTime;
    }

    public hydrate(data: RawDeliveryModeEntity): DeliveryModEntity {
        this.id = data.id;
        this.label = data.libelle_liv;
        this.modeName = data.nom_mode;
        this.averageDeliveryTime = data.delay_moy_liv

    return this;
    }

    public toObject(): RawDeliveryModeEntity {

        return {
            id: this.getId(),
            nom_mode: this.getModeName(),
            libelle_liv: this.getLabel(),
            delay_moy_liv: this.getAverageDelieryTime()
        }
    }
}