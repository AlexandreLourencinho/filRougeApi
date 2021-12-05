import StaticKnex from "../../../../class/orm/StaticKnex";
import Table from "../../../../class/orm/Table";
import DeliveryAddressEntity from "./DeliveryAddressEntity";

export default class DeliveryAddressTable extends Table {

    constructor() {
        super(
            'adresse_livraison',
            //@ts-ignore
            DeliveryAddressEntity
        );
    }
}