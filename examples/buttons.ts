import Client from "../lib/Client";
import { token } from "../config.test.json";

let client = new Client({
     "token": token,
});

client.on("messageEvent", (message) => {
    if (message.content === ">buttons") {
        message.channel.sendMessage({
           content: "Hi here are some buttons",
           components: [
               {
                   type: 1,
                   components: [
                       {
                           type: 2,
                           label: "Click",
                           style: 3,
                           custom_id: "B1"
                       },
                       {
                           type: 2,
                           label: "Click this one too!",
                           style: 1,
                           custom_id: "B2"
                       }
                   ]
               }
           ]
        })
    }
})

client.on("interactionButtonEvent", (interaction) => {
    if (interaction.data.custom_id === "B1") {
        // Code here...
    }
})


client.startGateway();
client.on("ready", () => {
     console.log("Ready!");
});