import { Method } from "got/dist/source";
import { Identifiers } from "./Types";
import { ISettingsParam } from "tslog";

import type { APIMessageComponent, APIEmbedAuthor, APIEmbedFooter, APIMessageComponentGuildInteraction } from "discord-api-types";
import Message from "../structures/Message";

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
    command?: {
        prefix: string;
        allow_bots?: boolean;
        cache_usage?: boolean;
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
    components?: APIMessageComponent[];
}

export interface IRestOptions {
    auth?: boolean;
    method: Method;
}


export interface events<T> {
    (event: "ratelimit", listener: () => void): T;
    (event: "messageEvent", listener: (message: Message) => void): T;
    (event: "ready", listener: () => void): T;
    (event: "interactionButtonEvent", listener: (interaction: APIMessageComponentGuildInteraction) => void): T;
}