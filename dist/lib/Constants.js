"use strict";
let apiVersion = 9;
let baseLink = `https://discord.com/api/v${apiVersion}`;
let githubURL = "https://github.com/WayvshockGD/Solar.js";
let channel = (channelID) => `${baseLink}/channels/${channelID}/`;
let messages = (channelID) => `${channel(channelID)}/messages`;
module.exports = { channel, messages, githubURL, baseLink, apiVersion };
