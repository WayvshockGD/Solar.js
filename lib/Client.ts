import EventEmitter from "events";
import { apiVersion, botGateway, messages, wsUrl } from "./Constants";
import ShardManager from "./managers/ShardManager";
import Requester from "./rest/Requester";
import Erlpack from "erlpack";
import { IOptions, MessageOptions } from "./types/Context";

import type { GatewayMessageCreateDispatch } from "discord-api-types/v9";

export = class Client extends EventEmitter {
    options: IOptions;
    requester: Requester;
    shards: ShardManager;

    public url: string = "";
    constructor(options: IOptions) {
        super();

        this.options = options;
        this.shards = new ShardManager(this);
        this.requester = new Requester(this);
    }

    async sendMessage(channel: string, content: MessageOptions | string) {
        await this.requester.request<GatewayMessageCreateDispatch>(messages(channel), {
            method: "POST", 
            auth: true
        }, content);
    }

    async startGateway() {

        this.url = `${wsUrl}/?v=${apiVersion}&encoding=${Erlpack ? "etf" : "json"}/`;

        for (let shard of [0]) {
            this.shards.spawnShard(shard);
        }
    }
}