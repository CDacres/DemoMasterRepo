export type ID = Ref;
export type Ref = string | number;
export type WithId<T extends ID = ID> = { id: T };
