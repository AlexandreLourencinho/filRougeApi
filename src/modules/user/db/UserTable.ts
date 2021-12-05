import Table from "../../../class/orm/Table";
import Knex from "knex";
import UserEntity from "./UserEntity";
import StaticKnex from "../../../class/orm/StaticKnex";

export default class UserTable extends Table {

    constructor() {

        super(
            "utilisateurs",
            // @ts-ignore
            UserEntity
        );
    }

}
