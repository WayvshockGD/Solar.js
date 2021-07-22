import EventEmitter from "events";
import WebSocket from "ws";
import Client from "../Client";
import { agent } from "../Constants";

export = class Shard extends EventEmitter {
    _client: Client;
    constructor(id: number, _client: Client) {
        super();

        this._client = _client;
        this.startWsEvents()
    }

    startWsEvents() {
        let websocket = new WebSocket(this._client.url);

        websocket.on("message", (data) => {
            websocket.send(JSON.stringify({
                op: 2,
                d: {
                    token: this._client.options.token,
                    properties: {
                        "$os": process.platform,
                        "$browser": "Solarjs",
                        "$device": "Solarjs"
                    },
                    compress: false,
                    large_treshold: 230,
                    presence: {
                        status: "online",
                        afk: false
                    }
                }
            }))
        });
        websocket.on("open", () => {});
    }
}