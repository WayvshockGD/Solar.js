import got, { OptionsOfTextResponseBody } from "got/dist/source";
import Client from "../Client";
import { agent } from "../Constants";
import { IRestOptions } from "../types/Context";

class Requester {
    private _client: Client;
    constructor(client: Client) {

        this._client = client;
    }

    async request(url: string, options: IRestOptions, body?: any) {

        let auth = (typeof options.auth === "undefined") ? "" : `Bot ${this._client.options.token}`;

        let gotOptions: OptionsOfTextResponseBody =  {  
             headers: {
                "content-type": "application/json",
                "User-Agent": agent,
                "Authorization": auth,
                "Accept-Encoding": "gzip,deflate",
                "X-RateLimit-Precision": "millisecond"
            },
            method: options.method,
        }

        if (body) {
            gotOptions.json = body;
        }

        let res = await got(url, { ...gotOptions });

        if (res.statusCode === 429) {
            return this._client.emit("ratelimit");
        }

        return res;
    }
}

export = Requester;