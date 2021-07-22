"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = __importDefault(require("events"));
module.exports = class Client extends events_1.default {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    startGateWay(token) {
        let botToken = (typeof this.options.token === "undefined") ? token : this.options.token;
        let gateWayToken = (botToken?.startsWith("Bot ")) ? botToken : `Bot ${botToken}`;
    }
};
