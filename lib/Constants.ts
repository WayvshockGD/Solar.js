import pkg from "../package.json";

let apiVersion = 9

let baseLink = `https://discord.com/api/v${apiVersion}`

let githubURL = "https://github.com/WayvshockGD/Solar.js"

let wsUrl = "wss://gateway.discord.gg"

let botGateway = `${baseLink}/gateway/bot`

let agent = `Solarjs (${githubURL} ${pkg.version})`

let DEFAULT_INTENTS = 770


let channel = (channelID: string) => `${baseLink}/channels/${channelID}`
let messages = (channelID: string) => `${channel(channelID)}/messages`
let deleteMessage = (channelID: string, messageID: string) => `${messages(channelID)}/${messageID}`;
let guild = (guildID: string) => `${baseLink}/guilds/${guildID}`;

export {
  apiVersion,
  baseLink,
  githubURL,
  wsUrl,
  botGateway,
  agent,
  DEFAULT_INTENTS,
  channel,
  messages,
  deleteMessage,
  guild
}