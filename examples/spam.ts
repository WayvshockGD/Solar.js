import { token } from "../config.test.json";
import { Client } from "../index";

let client = new Client({
    "token": token
});

client.on("messageEvent", (message) => {
    if (message.content === ">spam") {
        let arr = [1, 2, 3, 4, 5, 6, 7, 8];

    for (let a of arr) {
        message.channel.sendMessage("hi")
    }
    }
})

client.startGateway();
client.on("ready", () => client.logger.info("ready!"));