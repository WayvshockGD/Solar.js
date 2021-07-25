import Client from "../lib/Client";
import { token } from "../config.test.json";
import Message from "../lib/structures/Message";

let client = new Client({
     "token": token
});

client.on("messageEvent", (message) => {
    if (message.content === ">embed") {
        message.channel.sendMessage({
            embeds: [
                {
                    title: "Hi i am a example embed",
                    fields: [
                        {
                            name: "some text",
                            value: "more text"
                        }
                    ]
                }
            ],
        })
    }
})

client.startGateway();
client.on("ready", () => { console.log("Ready!"); });