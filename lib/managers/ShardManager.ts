import Client from "../Client";
import Shard from "../shards/Shard";

class ShardManager extends Map<number, Shard> {
    client: Client;
    constructor(client: Client) {
        super();

        this.client = client;
    }

    spawnShard(id: number) {
        let shard = this.get(id);
        if (!shard) {
            this.set(id, new Shard(id, this.client));
        }
    }
}

export = ShardManager;