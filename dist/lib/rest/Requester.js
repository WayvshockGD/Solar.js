"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const source_1 = __importDefault(require("got/dist/source"));
const Constants_1 = require("../Constants");
const package_json_1 = require("../../package.json");
module.exports = class Requester {
    _client;
    constructor(client) {
        this._client = client;
    }
    async request(url, options, body) {
        let auth = (typeof options.auth === "undefined") ? "" : `Bot ${this._client.options.token}`;
        let agent = `Solarjs (${Constants_1.githubURL}, ${package_json_1.version})`;
        let res = await source_1.default(url, {
            form: body,
            headers: {
                Authorization: auth
            }
        });
    }
};
