import { APIChannel } from "discord-api-types";
import Client from "../Client";
import Base from "./Base";

export = class Channel extends Base {
    data: APIChannel;
    client: Client;
    constructor(data: APIChannel, client: Client) {
        super();

        this.data = data;
        this.client = client;
    }

    get messageSize() {
        return this.data.message_count;
    }
}