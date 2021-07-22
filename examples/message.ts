import Client from "../lib/Client";
import { token } from "../config.test.json";

let client = new Client({
    "token": token,
    "shards": {
        "max": 1
    }
});

client.startGateway();