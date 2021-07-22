import EventEmitter from "events";
import { apiVersion, botGateway, messages } from "./Constants";
import ShardManager from "./managers/ShardManager";
import Requester from "./rest/Requester";
import Erlpack from "erlpack";
import { events, IOptions, MessageOptions } from "./types/Context";

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
        await this.requester.request(messages(channel), {
            method: "POST", 
            auth: true
        }, content);
    }

    private getGateway() {
        return this.requester.request(botGateway, { method: "GET", auth: true });
    }

    async startGateway() {
        let data = await this.getGateway();

        // @ts-ignore
        this.url = `${data.url}?v=${apiVersion}&encoding=${Erlpack ? "etf" : "json"}`;

        for (let shard of [0]) {
            this.shards.spawnShard(shard);
        }
    }
}