export type FindOneByArgs = {
    where?: string,
    column: string,
    operator?: string,
    value: any
};

export type JoinType = "INNER" | "LEFT" | "RIGHT" | "LEFT OUTER" | "RIGHT OUTER";

export type Join = {
    type?: JoinType,
    table: string,
    fromTable?: string,
    column: string,
    operator?: string,
    references?: string
};