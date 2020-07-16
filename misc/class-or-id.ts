export type ClassOrId<T extends { id: string }> = T | T["id"];
