import Client from "../lib/Client";
import { token } from "../config.test.json";
import Message from "../lib/structures/Message";

let client = new Client({
     "token": token,
     "identify": {
         "presence": {
             "activities": [
                {
                    name: "hi",
                    type: 0
                }
            ],
             "status": "idle"
         }
     }
});

client.on("messageEvent", (message: Message) => {
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

client.startGateway();
client.on("ready", () => { console.log("Ready!"); });