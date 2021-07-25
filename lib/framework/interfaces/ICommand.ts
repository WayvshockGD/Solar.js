import Client from "../../Client";
import Message from "../../structures/Message";
import { embedOptions } from "../../types/Context";

export interface ICommand {
    name: string;
    description: string;
    enabled: boolean;
    execute: ({}: ctx) => Promise<string | embedOptions[]>;
}

export interface ctx {
    args: string[];
    client: Client;
    message: Message;
}