interface ObjectConstructor {

    assign(...objects: Object[]): Object;

    entries<T>(o: { [s: string]: T }): [string, T][];
    entries(o: any): [string, any][];
}