import got from "got/dist/source";
import Client from "../Client";
import { githubURL } from "../Constants";
import { version } from "../../package.json";
import { IRestOptions } from "../types/Context";

export = class Requester {
    private _client: Client;
    constructor(client: Client) {

        this._client = client;
    }

    async request(url: string, options: IRestOptions, body: object) {

        let auth = (typeof options.auth === "undefined") ? "" : `Bot ${this._client.options.token}`;
        let agent = `Solarjs (${githubURL}, ${version})`

        let res = await got(url, {
            form: body,
            headers: {
                Authorization: auth
            }
        });
    }
}