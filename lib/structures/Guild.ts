import { APIGuild } from "discord-api-types";
import Client from "../Client";
import Base from "./Base";

export = class Guild extends Base {
    private data?: APIGuild;

    constructor(data: APIGuild | undefined, client: Client) {
        super(client);

        this.data = data;
    }

    get id() {
        return this.data?.id;
    }

    get memberCount(): number | undefined {
        return this.data?.member_count;
    }
}