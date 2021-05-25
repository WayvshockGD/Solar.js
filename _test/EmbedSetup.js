let { EmbedBuilder, Client } = require("../index");

let client = new Client({}, "<token>");

let embed = new EmbedBuilder()
            .setTitle("title-here")
            .setDescription("description-here")
            .setColor("lightBlue")
            .setFields([
                  {name: "title-here", value: "message-here", inline: true}
             ])

client.startGateway();
