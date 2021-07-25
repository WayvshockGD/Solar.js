import EventEmitter from "events";
import { apiVersion, botGateway, DEFAULT_INTENTS, deleteMessage, messages, wsUrl } from "./Constants";
import ShardManager from "./managers/ShardManager";
import Requester from "./rest/Requester";
import Erlpack from "erlpack";
import { events, IOptions, MessageOptions } from "./types/Context";

import type { 
    APIGuild, 
    APIGuildMember, 
    Snowflake,
    GatewayMessageCreateDispatch
} from "discord-api-types/v9";

import { Logger } from "tslog";
import Message from "./structures/Message";
import RestClient from "./rest/RestClient";

export = class Client extends EventEmitter {
    options: IOptions;
    requester: Requester;
    shards: ShardManager;
    logger: Logger;
    guilds: Map<Snowflake | undefined, APIGuild | undefined>;
    members: Map<string | undefined, APIGuildMember>;
    rest: RestClient;

    on: events<this> = this.on;

    public url: string = "";
    constructor(options: IOptions) {
        super();

        this.options = options;
        this.shards = new ShardManager(this);
        this.requester = new Requester(this);
        this.rest = new RestClient(this);
        this.guilds = new Map();
        this.members = new Map();
        this.logger = new Logger(options.logger?.loggerOptions);

        if (!options.intents) {
            options.intents = DEFAULT_INTENTS;
        }
    }

    async sendMessage(channel: string, content: MessageOptions | string): Promise<Message> {
        // @ts-ignore
        if (content.embeds && !content.embeds.length) {
            throw new Error("Invalid embeds size.");
        }
        let messageContent = typeof content === "object" ? content : { content };
        
        return await this.requester.request<GatewayMessageCreateDispatch>(messages(channel), {
            method: "POST", 
            auth: true
            // @ts-ignore
        }, messageContent).then(data => new Message(data, this));
    }

    public deleteMessage(channelID: Snowflake, messageID: Snowflake) {
        return this.requester.request(deleteMessage(channelID, messageID), {
            auth: true,
            method: "DELETE"
        })
    }

    private getGateway() {
        return this.requester.request<any>(botGateway, {
            auth: true,
            method: "GET"
        });
    }

    public getGuildChannel() {}

    async startGateway() {
        if (!this.options.token) {
            throw new Error("A token must be provided in the contructor.");
        }

        let data = await this.getGateway();
        let shards: number[] = [];

        this.url = `${wsUrl}/?v=${apiVersion}&encoding=${Erlpack ? "etf" : "json"}/`;

        if (!this.options.shards?.max) {
            let guildShards: number = JSON.parse(data.body).shards;

            for (let x = 0 + 1; x < guildShards + 1; x++) {
                shards.push(x);
            }
        } else {
            for (let x = 0 + 1; x < this.options.shards.max + 1; x++) {
                shards.push(x);
            }
        }

        for (let shard of shards) {
            this.shards.spawnShard(shard);
        }
    }
}