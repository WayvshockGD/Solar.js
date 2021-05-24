module.exports = {
           INVITE_REGEX: /(?:\w+\.)?discord(?:(?:app)?\.com\/invite|\.gg)\/([A-Za-z0-9-]+)/,
           EMOJI_REGEX: /^<a?:(\w+):(\d+)>$/,
           CHANNEL_REGEX: /^<#(\d+)>$/,
           ROLE_REGEX: /^<@&(\d+)>$/,
           MENTION_REGEX: /^<@!?(\d+)>$/,
           CHANNEL_JUMP_REGEX: /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(\@me|\d+)\/(\d+)$/,
           MESSAGE_JUMP_REGEX: /(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(\@me|\d+)\/(\d+)\/(\d+)$/,
           MARKDOWN: {
                      bold: /\*\*([\s\S]+?)\*\*/,
                      codeblock: /\`\`\`(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*\`\`\`/,
                      codestring: /`([\s\S]+?)`/,
                      italics: /_([\s\S]+?)_|\*([\s\S]+?)\*/,
                      spoiler: /\|\|([\s\S]+?)\|\|/,
                      strike: /~~([\s\S]+?)~~(?!_)/,
                      underline: /__([\s\S]+?)__/,
                      url: /^((?:https?|steam):\/\/[^\s<]+[^<.,:;"'\]\s])/
  }
}
