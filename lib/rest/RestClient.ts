import { APIGuild } from "discord-api-types";
import Client from "../Client";
import { guild } from "../Constants";

class RestClient {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getGuild(id: string): Promise<APIGuild> {
        return this.client.requester.request<{ body: APIGuild }>(guild(id), {
            auth: true,
            method: "GET"
            // @ts-ignore
        }).then(data => (typeof data?.body === "object") ? data.body : JSON.parse(data?.body));
    }
}

export = RestClient;