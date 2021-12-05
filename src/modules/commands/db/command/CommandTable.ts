import Table from "../../../../class/orm/Table";
import CommandEntity from "./CommandEntity";
import StaticKnex from "../../../../class/orm/StaticKnex";

export default class CommandTable extends Table {

    constructor() {
        super(
            'commandes',
            // @ts-ignore
            CommandEntity,
            [
                {
                    table: 'adresse_livraison',
                    column: 'addr_livr_id'
                },
                {
                    table: 'modes_livraison',
                    column: 'mode_livr_id'
                },
                {
                    table: 'pays',
                    fromTable: 'adresse_livraison',
                    column: 'pays_id'
                },
                {
                    table: 'utilisateurs',
                    fromTable: 'adresse_livraison',
                    column: 'utilisateur_id'
                },
                {
                    table: 'reduc_passee_utilisateurs',
                    fromTable: 'utilisateurs',
                    column: 'id',
                    references: 'utilisateurs_id'
                },
                {
                    table: 'reduc_passee',
                    fromTable: 'reduc_passee_utilisateurs',
                    column: 'reduc_passee_id'
                },
                {
                    table: 'reduction',
                    fromTable: 'reduc_passee',
                    column: 'reduc_id'
                }
            ]
        );
    }
}