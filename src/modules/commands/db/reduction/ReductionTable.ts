import StaticKnex from "../../../../class/orm/StaticKnex";
import Table from "../../../../class/orm/Table";
import ReductionEntity from "./ReductionEntity";

export default class ReductionTable extends Table {

    constructor() {
        super(
            'reduction',
            //@ts-ignore
            ReductionEntity
        )
    }
}