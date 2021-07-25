import { GatewayMessageCreateDispatchData, APIUser, Snowflake } from "discord-api-types";
import Client from "../Client";
import CommandHandler from "../framework/CommandHandler";
import { MessageOptions } from "../types/Context";
import Base from "./Base";
import { Channel } from "./Channel";
import Guild from "./Guild";

export = class Message extends Base {
    client: Client;
    private data: GatewayMessageCreateDispatchData;

    id: string;
    author: APIUser;
    
    channel: Channel;
    guild: Guild;
    constructor(data: GatewayMessageCreateDispatchData, client: Client) {
        super(client);

        this.client = client;
        this.data = data;

        this.author = data.author;
        this.id = data.id;

        this.guild = new Guild(client.guilds.get(data.guild_id), client);

        this.channel = new Channel({ id: data.channel_id, message: this }, client);
    }

    get content() {
        return this.data.content;
    }

    get mentions() {
        return this.data.mentions;
    }

    public handleCommands() {
        return new CommandHandler(this.client, this);
    }

    sendMessage(content: MessageOptions | string) {
        // @ts-ignore
        if (content.embeds && !content.embeds.length) {
            throw new Error("Invalid embeds size.");
        }
        
        return this.client.sendMessage(this.data.channel_id, content);
    }
}