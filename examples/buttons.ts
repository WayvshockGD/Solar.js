import Client from "../lib/Client";
import { token } from "../config.test.json";
import Message from "../lib/structures/Message";

let client = new Client({
     "token": token
});

client.on("messageEvent", (message: Message) => {
    if (message.content === ">embed") {
        message.channel.sendMessage({
           components: [{ type: 1 }]
        })
    }
})

client.startGateway();
client.on("ready", () => { console.log("Ready!"); });