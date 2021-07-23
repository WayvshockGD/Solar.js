import WebSocket from "ws";
import Heartbeat from "../Heartbeat";

import type { GatewayDispatchPayload } from "discord-api-types";
import Client from "../../Client";
import Message from "../../structures/Message";

let sessionID = "";
let seqNum = 0;

export = class WebSocketHandler<D> {
    ws: WebSocket;
    recievedHeartbeat: boolean;
    data?: D;

    constructor(ws: WebSocket, data?: D) {

        this.ws = ws;
        this.data = data;
        this.recievedHeartbeat = true;
    }

    

    public messageInit() {
        if (!this.data) return;
        // @ts-ignore
        let data = (typeof this.data === "object") ? this.data : JSON.parse(this.data);

        switch (data.op) {
            case 10:
                Heartbeat(data.d, this.ws, this);
                break;
            case 11:
                this.recievedHeartbeat = true;
            default:
                break;
        }
    }

    public onInit() {
        console.log("Ready!");
    }

    public onClose(client: Client, indentify: () => void) {

        // @ts-ignore
        let data = typeof this.data === "object" ? this.data : JSON.parse(this.data);
        switch (data.code) {
            case 1001:
                this.ws.send({
                    "op": 6,
                    "d": {
                        "token": client.options.token,
                        "session_id": sessionID,
                        "seq": seqNum
                    }
                });
                indentify();
                break;
        
            default:
                break;
        }
    }

    public onError() {
        console.log(this.data);
    }

    public unexpected() {
        console.log();
    }

    public static async onEvent(packet: GatewayDispatchPayload, client: Client) {
        switch (packet.op) {
            case 0:
                switch (packet.t) {
                    case "MESSAGE_CREATE":

                        if (!packet.d) {
                            if (client.options.logger?.debug) {
                                client.logger.debug("No packet found.");
                            }
                            return;
                        }
                        
                        client.emit("messageEvent", new Message(packet.d, client));
                        break;
                    case "READY":
                        client.emit("ready");

                        sessionID = packet.d.session_id;
                        seqNum = packet.s;
                        break;
                    case "GUILD_CREATE":
                        if (!packet.d) return;
                        if (client.guilds.has(packet.d.id)) return;

                        client.guilds.set(packet.d.id, packet.d);

                        if (!packet.d.members?.length) return;

                        for (let member of packet.d.members) {
                            if (!member.user?.id) return;
                            
                            client.members.set(member.user?.id, member);
                        }
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
}