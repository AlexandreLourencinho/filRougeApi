import Table from "../../../class/orm/Table";
import Knex from "knex";
import UserEntity from "./UserEntity";

export default class UserTable extends Table {

    constructor(knex: Knex) {
        // @ts-ignore
        super(knex, "utilisateurs", UserEntity);
    }

}
