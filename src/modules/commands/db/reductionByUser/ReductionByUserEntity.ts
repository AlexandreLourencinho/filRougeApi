import Entity from "../../../../class/orm/Entity";
import EffectiveReductionEntity from "../effectiveReduction/EffectiveReductionEntity";
import UserEntity from "../../../user/db/UserEntity";
import {RawHydrateReductionByUserEntity, RawReductionByUserEntity} from "../../types";

export default class ReductionByUserEntity extends Entity {

    private effectiveReduction: EffectiveReductionEntity | undefined;
    private user: UserEntity | undefined;

    public setUser(user: UserEntity): ReductionByUserEntity {
        this.user = user;
        return this;
    }

    public setEffectiveReduction(effectiveReduction: EffectiveReductionEntity): ReductionByUserEntity {
        this.effectiveReduction = effectiveReduction;
        return this;
    }

    public getUser(): UserEntity {
        return <UserEntity>this.user;
    }

    public getEffectiveReduction(): EffectiveReductionEntity {
        return <EffectiveReductionEntity>this.effectiveReduction;
    }

    public hydrate(data: RawHydrateReductionByUserEntity): ReductionByUserEntity {
        this.user = (new UserEntity().hydrate(data.utilisateurs));
        this.effectiveReduction = (new EffectiveReductionEntity().hydrate({reduction: data.reduction, reduc_passee: data.reduc_passee}));

        return this;
    }

    public toObject(): RawReductionByUserEntity{

        return {
            utilisateurs_id: this.getUser().getId(),
            reduc_passee_id: this.getEffectiveReduction().getId()
        };
    }

}