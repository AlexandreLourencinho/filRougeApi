import Table from "../../../../class/orm/Table";
import StaticKnex from "../../../../class/orm/StaticKnex";
import ReductionByUserEntity from "./ReductionByUserEntity";

export default class ReductionByUserTable extends Table {

    constructor() {
        super(
            'reduc_passee_utilisateurs',
            // @ts-ignore
            ReductionByUserEntity
        );

    }

}