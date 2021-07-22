import EventEmitter from "events";
import { IOptions } from "./types/Context";

export = class Client extends EventEmitter {
    options: IOptions;
    constructor(options: IOptions) {
        super();

        this.options = options;
    }

    startGateWay(token?: string) {
        let botToken = (typeof this.options.token === "undefined") ? token : this.options.token;
        let gateWayToken = (botToken?.startsWith("Bot ")) ? botToken : `Bot ${botToken}`;
    }
}