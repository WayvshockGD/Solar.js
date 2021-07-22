import WebSocket from "ws"
import WebSocketHandler from "./handlers/WebsocketHandler"

export = function(data: { heartbeat_interval: number }, 
    ws: WebSocket, 
    handler: WebSocketHandler<any>
) {
    if (!handler.recievedHeartbeat) return;

    setInterval(() => {
        ws.send(JSON.stringify({
            op: 1,
            d: 0
        }));
        handler.recievedHeartbeat = false;
    }, data.heartbeat_interval)
}