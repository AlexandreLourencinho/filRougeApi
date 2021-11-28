export default class Entity {

    public getId(): number {
        throw new Error('getId method wasn\'t implemented yet');
    }

    public setId(id: number): Entity {
        throw new Error('setId method wasn\'t implemented yet');
    }

    public static hydrate(data: Array<any>, entity: () => Entity): Array<Entity> | Entity | undefined {
        if (data.length === 0) return undefined;
        if (data.length === 1) { // @ts-ignore
            return (new entity()).hydrate(data[0]);
        }
        // @ts-ignore
        return data.map(d => (new entity()).hydrate(d));
    }

    public hydrate(data: any): Entity {
        throw new Error('hydrate method wasn\'t implemented yet');
    }

    public toObject(): any {
        throw new Error('toObject method wasn\'t implemented yet');
    }

    public toJson(): Entity {
        return this;
    }
}
