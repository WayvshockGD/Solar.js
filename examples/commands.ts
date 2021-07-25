import { token } from "../config.test.json";
import { Client } from "../index";

let client = new Client({
    "token": token
});

client.on("messageEvent", (message) => {
    if (message.content === ">status") {
        client.status("hi", "idle");
        message.channel.sendMessage("Set status to `Idle`");
    }
})

client.startGateway();
client.on("ready", () => client.logger.info("ready!"));