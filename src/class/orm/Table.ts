import Knex from "knex";
import Entity from "./Entity";
import Logger from "../logger/Logger";
import {FindOneByArgs, Join} from "./types";

export default class Table {

    protected readonly knex: Knex;
    protected readonly table: string;
    private readonly entity: () => Entity;
    private readonly joins: Array<Join>

    constructor(knex: Knex, table: string, entity: () => Entity, joins: Array<Join> = []) {
        this.knex = knex;
        this.table = table;
        this.entity = entity;
        this.joins = joins;
    }

    protected buildJoin(knex: Knex.QueryBuilder): Knex.QueryBuilder {

        this.joins.forEach(join =>
            knex.joinRaw(`${join.type || "INNER"} JOIN ${join.table} ON ${join.fromTable || this.table}.${join.column} ${join.operator || "="} ${join.table}.${join.references || `id`}`).options({nestTables: true})
        );

        return knex;
    }

    public findOneBy(...args: Array<FindOneByArgs>): Promise<Entity | void> {
        const request = this.knex(this.table)
            .select(`*`)
            .where(builder => args.forEach(arg => builder.where(arg.column, arg.operator || '=', arg.value)
            ))
            .limit(1);

        return this.buildJoin(request)
            .then(data => {
                return Entity.hydrate(data, this.entity) as Entity;
            })
            .catch(Logger.catch(`ESQL-FOB-${this.table}-`));
    }

    public findOneByid(id: number): Promise<Entity | void> {
        return this.findOneBy({column: `${this.table}.id`, value: id});
    }

    public findAllBy(...args: Array<FindOneByArgs>): Promise<Array<Entity> | Entity | void> {
        const request = this.knex(this.table)
            .select('*')
            .where(builder => args.forEach(arg => {
                if (arg.where === 'OR') return builder.orWhere(arg.column, arg.operator || '=', arg.value);
                return builder.where(arg.column, arg.operator || '=', arg.value);
            }));

        return this.buildJoin(request)
            .then(data => Entity.hydrate(data, this.entity) as Array<Entity>)
            .catch(Logger.catch(`ESQL-FAB-${this.table}`));
    }

    public findAll(): Promise<Array<Entity> | Entity | void> {
        const request = this.knex(this.table)
            .select('*');

        return this.buildJoin(request)
            .then(data => Entity.hydrate(data, this.entity) as Array<Entity>)
            .catch(Logger.catch(`ESQL-FA-${this.table}`))
    }

    public searchBy(...args: Array<FindOneByArgs>): Promise<Array<Entity> | Entity | void> {
        return this.findAllBy(...args);
    }

    public insert(entity: Entity): Promise<Entity | void> {
        return this.knex(this.table)
            .insert(entity.toObject(), ['id'])
            .then(([id]) => this.findOneByid(id))
            .catch(Logger.catch(`ESQL-I-${this.table}`))
    }

    public update(entity: Entity): Promise<Entity | void> {
        return this.knex(this.table)
            .update(entity.toObject())
            .where('id', entity.getId())
            .then(() => this.findOneByid(entity.getId()))
            .catch(Logger.catch(`ESQL-U-${this.table}`))
    }

    public delete(entity: Entity): Promise<boolean | void> {
        return this.knex(this.table)
            .delete()
            .where('id', entity.getId())
            .then(() => true)
            .catch(Logger.catch(`ESQL-D-${this.table}`))
    }

}