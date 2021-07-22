![image](https://user-images.githubusercontent.com/61085765/119387687-47770c80-bc97-11eb-9685-14d78d51be88.png)


## Solar.js is a discord api library for use with node.js

# Status
```
Core: 🔴
Client: 🔴
Rest: ⭕
Requester: 🔵
```

Once the library is complete i will publish it to npm.

# Example if you want
```js
let { Client } = require("solar.js");

let client = new Client({
    "token": "client-token",
    // other options 
});

client.on("messageEvent", (message) => {
return message.channel.sendMessage({
       embeds: [{ title: "Hi I am a embed!" }]
    })
})

client.startGateway() // Starting the bot gateway and it's shards.
```

# What will the library do
Well giving that its gonna be like discord.js and eris together.  

# Support
join the support server https://discord.gg/KtQHZWh8
