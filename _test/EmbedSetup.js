let { EmbedBuilder } = require("../index");

let embed = new EmbedBuilder()
            .setTitle("t")
            .setDescription("h")
            .setColor("")
            .setFields([
                  {name: "test", value: "words-here", inline: true}
             ])
