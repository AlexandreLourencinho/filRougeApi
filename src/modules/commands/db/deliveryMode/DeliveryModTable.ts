import StaticKnex from "../../../../class/orm/StaticKnex";
import Table from "../../../../class/orm/Table";
import DeliveryModEntity from "./DeliveryModEntity";

export default class DeliveryModTable extends Table {

    constructor() {
        super(
            'modes_livraison',
            // @ts-ignore
            DeliveryModEntity
        );
    }
}