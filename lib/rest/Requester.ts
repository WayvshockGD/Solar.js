import got, { OptionsOfTextResponseBody } from "got/dist/source";
import Client from "../Client";
import { agent } from "../Constants";
import { IRestOptions } from "../types/Context";
import Ratelimiter from "./Ratelimiter";

class Requester {
    private _client: Client;

    constructor(client: Client) {

        this._client = client;
    }

    async request<Data>(url: string, options: IRestOptions, body?: any) {

        let auth = (typeof options.auth === "undefined") ? "" : `Bot ${this._client.options.token}`;

        if (this._client.ratelimits.length) {
            setInterval(() => {
                for (let x = 0; x > this._client.ratelimits.length; x++) {
                    console.log(x)
                    delete this._client.ratelimits[x];
                }
            }, 10000)
            console.log(this._client.ratelimits.length)
            console.log(this._client.ratelimits.length < 0)
            if (this._client.ratelimits.length < 0) {
                return;
            }
        }

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

        new Ratelimiter(res.headers, this._client.ratelimits)

        if (res.statusCode === 429) {
            this._client.emit("ratelimit");
            return;
        }

        // @ts-ignore
        let resBody: Data = res;
        
        return resBody;
    }
}

export = Requester;