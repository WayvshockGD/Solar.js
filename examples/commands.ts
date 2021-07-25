import { token } from "../config.test.json";
import { Client } from "../index";

let client = new Client({
    "token": token
});

client.on("messageEvent", (message) => {})

client.startGateway();
client.on("ready", () => client.logger.info("ready!"));