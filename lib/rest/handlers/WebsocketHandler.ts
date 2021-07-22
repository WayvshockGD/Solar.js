import WebSocket, { Data } from "ws";

export = class WebSocketHandler<D> {
    ws: WebSocket;
    data?: D;
    constructor(ws: WebSocket, data?: D) {

        this.ws = ws;
        this.data = data;
    }

    public messageInit() {
        if (!this.data) return;
        // @ts-ignore
        let data = (typeof this.data === "object") ? this.data : JSON.parse(this.data);
        console.log(data);
    }

    public onInit() {
        console.log();
    }

    public onClose() {
        // @ts-ignore
        console.log(JSON.parse(this.data)) || this.data;
    }

    public onError() {
        console.log(this.data);
    }

    public unexpected() {
        console.log();
    }
}