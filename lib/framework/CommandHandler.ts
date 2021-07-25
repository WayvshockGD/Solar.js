import Client from "../Client";
import Message from "../structures/Message";
import { embedOptions } from "../types/Context";
import { ICommand } from "./interfaces/ICommand";

export = class CommandHandler {
    client: Client;
    message: Message;

    usages: Map<string, { command: string, content: string, time: Date }>;
    commands: Map<string, ICommand>;

    constructor(client: Client, message: Message) {
        this.client = client;
        this.message = message;

        this.usages = new Map();
        this.commands = new Map();
    }

    public handle() {
        let { command } = this.client.options;

        if (!command?.allow_bots || false && this.message.author.bot) return;

        let args = this.message.content.slice(command.prefix.length).trim().split(" ");

        let gotCommand = this.commands.get(args[0]);
        if (!gotCommand) {
            return this.client.emit("invalidCommandEvent", {
                channel: this.message.channel.id,
                command: args[0]
            });
        }

        args = args.slice(1);

        if (!gotCommand.enabled) return;

        gotCommand.execute({
            message: this.message,
            args,
            client: this.client
        }).then(this.handlePromises).catch(this.handlePromises);
    }

    private handlePromises(promise: string | embedOptions[]) {
        if (typeof promise === "string") {
            return this.message.sendMessage(promise);
        } else if (Array.isArray(promise)) {
            return this.message.sendMessage({
                embeds: promise
            });
        }
    }
}