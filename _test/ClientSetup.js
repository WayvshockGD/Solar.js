let { Client } = require("../index");

let client = new Client({options}, "<token>");

client.startGateway("<token>"); // token can go here or in the client constructor.
