import StaticKnex from "../../../../class/orm/StaticKnex";
import Table from "../../../../class/orm/Table";
import EffectiveReductionEntity from "./EffectiveReductionEntity";

export default class EffectiveReductionTable extends Table {

    constructor() {
        super(
            'reduc_passee',
            //@ts-ignore
            EffectiveReductionEntity
        )
    }
}