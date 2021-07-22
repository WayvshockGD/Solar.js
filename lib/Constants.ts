let apiVersion: number = 9;

let baseLink: string = `https://discord.com/api/v${apiVersion}`;

let githubURL: string = "https://github.com/WayvshockGD/Solar.js";


let channel = (channelID: string) => `${baseLink}/channels/${channelID}/`;
let messages = (channelID: string) => `${channel(channelID)}/messages`;

export = { channel, messages, githubURL, baseLink, apiVersion };