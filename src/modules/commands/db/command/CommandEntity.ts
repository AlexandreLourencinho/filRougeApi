import Entity from "../../../../class/orm/Entity";
import DeliveryAddressEntity from "../deliveryAddress/DeliveryAddressEntity";
import DeliveryModEntity from "../deliveryMode/DeliveryModEntity";
import moment, {Moment} from "moment";
import {RawCommandEntity, RawHydrateCommandEntity} from "../../types";
import ReductionEntity from "../reduction/ReductionEntity";

export default class CommandEntity extends Entity {

    private id: number | undefined;
    private deliveryAddress: DeliveryAddressEntity | undefined;
    private deliveryMode: DeliveryModEntity | undefined;
    private reduction: ReductionEntity | null | undefined;
    private dateCom: Moment | undefined;
    private commandTotal: number | undefined;
    private status: string | undefined;


    public setId(id: number): CommandEntity {
        this.id = id;
        return this;
    }

    public setDeliveryAddress(deliveryAddress: DeliveryAddressEntity): CommandEntity {
        this.deliveryAddress = deliveryAddress;
        return this;
    }

    public setDeliveryMode(deliveryMode: DeliveryModEntity): CommandEntity {
        this.deliveryMode = deliveryMode;
        return this;
    }

    public setReduction(reduction: ReductionEntity | null): CommandEntity {
        this.reduction = reduction;
        return this;
    }

    public setDateCom(dateCom: Moment): CommandEntity {
        this.dateCom = dateCom;
        return this;
    }

    public setCommandTotal(commandTotal: number): CommandEntity {
        this.commandTotal = commandTotal;
        return this;
    }

    public setStatus(status: string): CommandEntity {
        this.status = status;
        return this;
    }

    public getId(): number {
        return <number>this.id;
    }

    public getDeliveryAddress(): DeliveryAddressEntity {
        return <DeliveryAddressEntity>this.deliveryAddress;
    }

    public getDeliveryMode(): DeliveryModEntity {
        return <DeliveryModEntity>this.deliveryMode;
    }

    public getReduction(): ReductionEntity | null {
        return <ReductionEntity | null>this.reduction;
    }


    public getDateCom(): Moment {
        return <Moment>this.dateCom;
    }

    public getCommandTotal(): number {
        return <number>this.commandTotal;
    }

    public getStatus(): string {
        return <string>this.status;
    }


    public hydrate(data: RawHydrateCommandEntity): CommandEntity {
        this.id = data.commandes.id;
        this.commandTotal = data.commandes.total_commande;
        this.dateCom = moment(data.commandes.date_com);
        this.status = data.commandes.statut;
        this.deliveryAddress = (new DeliveryAddressEntity()).hydrate({utilisateurs: data.utilisateurs, pays: data.pays, adresse_livraison: data.adresse_livraison});
        this.deliveryMode = (new DeliveryModEntity()).hydrate(data.modes_livraison);
        this.reduction = (new ReductionEntity()).hydrate(data.reduction);

        return this;
    }

    public toObject(): RawCommandEntity{

        return {
            id: this.getId(),
            addr_livr_id: this.getDeliveryAddress().getId(),
            mode_livr_id: this.getDeliveryMode().getId(),
            reduc_id: this.getReduction()?.getId(),
            date_com: this.getDateCom().toDate(),
            total_commande: this.getCommandTotal(),
            statut: this.getStatus()
        }
    }


}