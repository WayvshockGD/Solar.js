import { GatewayDispatchPayload } from "discord-api-types";
import EventEmitter from "events";
import { Identifier } from "typescript";
import WebSocket, { Data } from "ws";
import Client from "../Client";
import WebSocketHandler from "../rest/handlers/WebsocketHandler";

export = class Shard extends EventEmitter {
    _client: Client;
    ws: WebSocket;
    id: number;
    webSocketHandler: <D>(data?: D) => WebSocketHandler<D>;
    constructor(id: number, _client: Client) {
        super();

        this.id = id;
        this._client = _client;
        this.ws = new WebSocket(_client.url, {
            ..._client.options.ws
        });
        this.webSocketHandler = <D>(data?: D) => new WebSocketHandler(this.ws, data);

        this.startWsEvents();
    }

    public identify() {
        let dent = this._client.options.identify;

        let indent = {
            op: 2,
            d: {
                token: this._client.options.token,
                intents: this._client.options.intents,
                properties: {
                    "$os": process.platform,
                    "$browser": dent?.properties?.$browser || "Solarjs",
                    "$device": dent?.properties?.$device || "Solarjs"
                },
                compress: false,
                large_threshold: 250,
                presence: {
                    activities: dent?.presence?.activities || [],
                    status: dent?.presence?.status || "online",
                    afk: false,
                }
            }
        }
        
        // @ts-ignore
        if (this._client.options.shards?.max > 1) {
            // @ts-ignore
            indent["shard"] = [this.id, this._client.options.shards?.max]
        }

        this.ws.send(JSON.stringify({ ...indent }));
    }

    public status(indentifier: Identifier, game: string) {
        this._client.guilds.forEach((guild) => {
            if (guild) {
                
            }
        })
    }

    startWsEvents() {
        this.ws.on("message", (dData) => {
            this.webSocketHandler<Data>(dData).messageInit();

            let data: GatewayDispatchPayload = (typeof dData === "object") 
                      ? dData 
                      : JSON.parse(dData);
                      
            WebSocketHandler.onEvent(data, this._client);
        });

        this.ws.on("open", () => {
            this.webSocketHandler();
            this.identify();
        })

        this.ws.on("close", (code, reason) => {
            this.webSocketHandler({ reason, code }).onClose(this._client, this.identify);
        });

        this.ws.on("error", (err) => {
            this.webSocketHandler(err).onError();
        });

        this.ws.on("unexpected-response", (rq, i) => {
            this.webSocketHandler<{ rq: object, i: any }>({ rq, i }).unexpected();
        });

        this.ws.on("ping", (d) => { console.log(d) });
    }
}