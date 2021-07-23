import { Method } from "got/dist/source";
import { Identifiers } from "./Types";
import { ISettingsParam } from "tslog";

import type { APIButtonComponent, APIEmbedAuthor, APIEmbedFooter } from "discord-api-types";

export interface activities {
    name: string;
    type: number;
}

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
            activities?: activities[];
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
    footer?: APIEmbedFooter;
    author?: APIEmbedAuthor;
    fields?: fields[];
}

export interface MessageOptions {
    embeds?: embedOptions[];
    content?: string;
    components?: APIButtonComponent[];
}

export interface IRestOptions {
    auth?: boolean;
    method: Method;
}


export interface events<T> {
    (event: "ratelimit"): T;
}