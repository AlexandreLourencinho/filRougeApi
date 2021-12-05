import StaticKnex from "../../../../class/orm/StaticKnex";
import Table from "../../../../class/orm/Table";
import CountryEntity from "./CountryEntity";

export default class CountryTable extends Table {

    constructor() {
        super(
            'pays',
            //@ts-ignore
            CountryEntity
        );
    }
}