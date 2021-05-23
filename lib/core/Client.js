let EventEmitter = require("eventemitter3");
let Collection = require("../utils/Collection);

class Client extends EventEmitter {

    /**
     * @param {string} token the token string used for logging in.
     * 
     * @param {object} [options] Base object of options.
     * @param {boolean} [options.compress] Compress data from discord.
     * @param {object} [options.ws] The ws object option.
     */
    constructor(token, options) {
        super();

        this.options = Object.assign({
            compress: false,
            ws: {}
        }, options);

        this.caches = {
              guilds: new Collection()
              users: new Collection()
        }
    }

    /**
     * @param {string} id The id of the channel the client will be sending it to.
     * @param {string|object} message The message object.
     */
    sendMessage(id, message) {}
}

module.exports = Client;
