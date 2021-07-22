import { GatewayMessageCreateDispatchData, APIUser } from "discord-api-types";
import Client from "../Client";
import { MessageOptions } from "../types/Context";
import Base from "./Base";
import Channel from "./Channel";

export = class Message extends Base {
    client: Client;
    data: GatewayMessageCreateDispatchData;

    id: string;
    author: APIUser;
    
    channel: Channel;
    constructor(data: GatewayMessageCreateDispatchData, client: Client) {
        super();

        this.client = client;
        this.data = data;

        this.author = data.author;
        this.id = data.id;

        this.channel = new Channel();
    }

    get content() {
        return this.data.content;
    }

    sendMessage(content: MessageOptions | string) {
        // @ts-ignore
        if (content.embeds && !content.embeds.length) {
            throw new Error("Invalid embeds size.");
        }
        
        return this.client.sendMessage(this.data.channel_id, content);
    }
}