import Entity from "../../../../class/orm/Entity";
import ReductionEntity from "../reduction/ReductionEntity";
import {RawEffectiveReductionEntity, RawHydrateEffectiveReductionEntity, RawReductionEntity} from "../../types";

export default class EffectiveReductionEntity extends Entity {

    private id: number | undefined;
    private reduction: ReductionEntity | undefined;

    public setId(id: number): EffectiveReductionEntity {
        this.id = id;
        return this;
    }

    public setReduction(reduction: ReductionEntity): EffectiveReductionEntity {
        this.reduction = reduction;
        return this;
    }

    public getId(): number {
        return <number>this.id;
    }

    public getReduction(): ReductionEntity {
        return <ReductionEntity>this.reduction;
    }

    public hydrate(data: RawHydrateEffectiveReductionEntity): EffectiveReductionEntity {
        this.id = data.reduc_passee.id;
        this.reduction = (new ReductionEntity().hydrate(data.reduction));

        return this
    }

    public toObject(): RawEffectiveReductionEntity {

        return  {
            id: this.getId(),
            reduc_id: this.getReduction().getId()
        };
    }

}