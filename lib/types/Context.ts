import { Method } from "got/dist/source";
import { Identifiers } from "./Types";
import { ISettingsParam } from "tslog";

export interface IOptions {
    token: string;
    logger?: { 
        debug?: boolean,
        loggerOptions?: ISettingsParam;
    };
    intents?: number;
    ws?: {};
    shards?: {
        max?: number;
    }
    identify?: {
        properties?: {
            $browser?: string;
            $device?: string;
        }
        presence?: {
            status?: Identifiers;
        }
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
    content?: string;
}

export interface IRestOptions {
    auth?: boolean;
    method: Method;
}


export interface events<T> {
    (event: "ratelimit"): T;
}