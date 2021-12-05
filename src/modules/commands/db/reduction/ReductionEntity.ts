import Entity from "../../../../class/orm/Entity";
import moment, {Moment} from "moment";
import {RawReductionEntity} from "../../types";

export default class ReductionEntity extends Entity {

    private id: number | undefined;
    private reducName: string | undefined;
    private reducValue: number | undefined;
    private fromDate: Moment | undefined;
    private toDate: Moment | undefined;
    private reducPercent: number | undefined;
    private reducStatus: string | undefined;

    public setId(id: number): ReductionEntity {
        this.id = id;
        return this;
    }

    public setReducName(reducName: string): ReductionEntity {
        this.reducName = reducName;
        return this;
    }

    public setReducValue(reducValue: number): ReductionEntity {
        this.reducValue = reducValue;
        return this;
    }

    public setFromDate(fromDate: Moment): ReductionEntity {
        this.fromDate = fromDate;
        return this;
    }

    public setToDate(toDate: Moment): ReductionEntity {
        this.toDate = toDate;
        return this;
    }

    public setReducPercent(reducPercent: number): ReductionEntity {
        this.reducPercent = reducPercent;
        return this;
    }

    public setReducStatus(reducStatus: string): ReductionEntity {
        this.reducStatus = reducStatus;
        return this;
    }

    public getId(): number {
        return <number>this.id;
    }

    public getReducName(): string {
        return <string>this.reducName;
    }

    public getReducValue(): number {
        return <number>this.reducValue;
    }

    public getFromDate(): Moment {
        return <Moment>this.fromDate;
    }

    public getToDate(): Moment {
        return <Moment>this.toDate;
    }

    public getReducPercent(): number {
        return <number>this.reducPercent;
    }

    public getReducStatus(): string {
        return <string>this.reducStatus;
    }

    public hydrate(data: RawReductionEntity): ReductionEntity {
        this.id = data.id;
        this.reducName = data.nom_reduc;
        this.reducStatus = data.statut_reduc;
        this.fromDate = moment(data.date_debut);
        this.toDate = moment(data.date_fin);
        this.reducPercent = data.qte_reduction;
        this.reducValue = data.montant_reduc;

        return this;
    }

    public toObject(): RawReductionEntity {

        return {
            id: this.getId(),
            montant_reduc: this.getReducValue(),
            qte_reduction: this.getReducPercent(),
            date_fin: this.getToDate().toDate(),
            date_debut: this.getFromDate().toDate(),
            nom_reduc: this.getReducName(),
            statut_reduc: this.getReducStatus()
        };
    }


}