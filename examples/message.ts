import { token } from "../config.test.json";
import Client from "../lib/Client";

let client = new Client({
    "token": token,
});

client.on("messageEvent", (message) => {
    if (message.content === ">message") {
        message.sendMessage("Hi this is from the message structure :D");
    } else if (message.content === ">channel") {
        message.channel.sendMessage("Hi this is from the channel structure ;D")
    } else if (message.content === ">client") {
        client.sendMessage(message.channel.id, "Saying hi from the client!");
    }
});

client.startGateway();

client.on("ready", () => { console.log("Ready!"); });