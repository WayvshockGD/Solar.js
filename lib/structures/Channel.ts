import Client from "../Client";
import { MessageOptions } from "../types/Context";
import Base from "./Base";
import Message from "./Message";

export interface IChannel {
    id: string;
    message: Message;
}

export class Channel extends Base {
    private data: IChannel;

    constructor(data: IChannel, client: Client) {
        super(client);

        this.data = data;
    }

    get id() {
        return this.data.id;
    }

    sendMessage(content: MessageOptions | string) {
        // @ts-ignore
        if (content.embeds && !content.embeds.length) {
            throw new Error("Invalid embeds size.");
        }
        
        return this.client.sendMessage(this.id, content);
    }

}