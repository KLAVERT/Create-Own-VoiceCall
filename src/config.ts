import {ActivityType} from 'discord.js'

export default {
  token: {
    DiscordToken: "Put_Your_Token_In_Here", //Add your own discord tokens
  },
  general: {
    guildID: "Put_Your_GuildID_In_Here", // Add your server guild ID
    clientID: "Put_Your_ClientID_In_Here", //Add your client ID of your bot
    activityName: "klavert on discord", //Add your own status here
    activityType: ActivityType.Watching, //Options: Competing, Custom, Listening, Playing, Streaming, Watching
    debugger: true, //let you see debugger commands in console (Good for developers!)
  },
  voice: {
    voicechannelSuffix: "Room", //Add your own suffix!
    voiceJoinChannel: "Put_Your_ChannelID_In_Here", //This is the channel you need to join to get your own channel!
    voiceJoinCategory: "Put_Your_CategoryID_In_Here", //This is the category the channel is created in!
  },
  commands: {
    permit: "voice-permit", //Set the name of the command, don't use CAPITAL!
    adminPermit: "voice-adminpermit", //Set the name of the command, don't use CAPITAL!
    rename: "voice-rename", //Set the name of the command, don't use CAPITAL!
    public: "voice-public", //Set the name of the command, don't use CAPITAL!
    private: "voice-private", //Set the name of the command, don't use CAPITAL!
    limit: "voice-limit", //Set the name of the command, don't use CAPITAL!
    unlimit: "voice-unlimit", //Set the name of the command, don't use CAPITAL!
    transfer: "voice-transfer", //Set the name of the command, don't use CAPITAL!
    claim: "voice-claim", //Set the name of the command, don't use CAPITAL!
    reject: "voice-reject", //Set the name of the command, don't use CAPITAL!
    disconnect: "voice-disconnect", //Set the name of the command, don't use CAPITAL!
    addOwner: "voice-addowner", //Set the name of the command, don't use CAPITAL!
    removeOwner: "voice-removeowner", //Set the name of the command, don't use CAPITAL!
    unghost: 'voice-unghost', //Set the name of the command, don't use CAPITAL!
    ghost: 'voice-ghost', //Set the name of the command, don't use CAPITAL!
    ghostAll: 'voice-ghostall', //Set the name of the command, don't use CAPITAL!
    unGhostAll: 'voice-unghostall', //Set the name of the command, don't use CAPITAL!
  },
};
