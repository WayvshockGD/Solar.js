import { Method } from "got/dist/source";

export interface IOptions {
    token: string;
    logger?: { debug?: boolean };
    ws?: {};
    shards?: {
        max?: number;
    }
}

export interface fields {
    name: string;
    value: string;
    inline?: boolean;
}

export interface embedOptions {
    title?: string;
    description?: string;
    footer?: {};
    fields?: fields[];
}

export interface MessageOptions {
    embeds?: embedOptions[];
}

export interface IRestOptions {
    auth?: boolean;
    method: Method;
}


export interface events<T> {
    (event: "ratelimit"): T;
}