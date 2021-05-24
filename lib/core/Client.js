let EventEmitter = require("eventemitter3");
let Collection = require("../utils/Collection");

class Client extends EventEmitter {

    /**
     * @param {string|null} token the token string used for logging in.
     * 
     * @param {object} [options] Base object of options.
     * @param {boolean} [options.compress] Compress data from discord.
     * @param {object} [options.ws] The ws object option.
     */
    constructor(token, options) {
        super();

        this.token = token;

        this.options = Object.assign({
            compress: false,
            ws: {}
        }, options);

        this.caches = {
              guilds: new Collection(),
              users: new Collection()
        };
    }

    /**
     * @param {string} id The id of the channel the client will be sending it to.
     * @param {string|object} message The message object.
     */
    sendMessage(id, message) {}

    /**
     * @param {string?} The token that will be used same as in the constructor.
     */
    startGateway(token) {
       let login = this.token === null ? token : this.token;

       if (login === undefined) throw new Error("token must be defined in the method or constructor!");
    }
}

module.exports = Client;
