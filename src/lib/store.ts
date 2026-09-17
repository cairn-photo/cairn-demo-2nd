export type RecordMap<T> = Map<string, T>;

export const createMemoryStore = <T>(): RecordMap<T> => new Map<string, T>();