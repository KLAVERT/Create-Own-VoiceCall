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
    removeName: false, //removes the name out of the database when everyone left the call
  },
  voice: {
    voicechannelSuffix: "Room", //Add your own suffix!
    voiceJoinChannel: "Put_Your_ChannelID_In_Here", //This is the channel you need to join to get your own channel!
    voiceJoinCategory: "Put_Your_CategoryID_In_Here", //This is the category the channel is created in!
    saveMethod: "json", // options: "database", "json", of "none"
    jsonFilePath: "./src/data/voiceChannelNames.json", // path to JSON-bestand
  },
  database: {
    type: "mysql", // options: "sqlite", "mysql", "postgresql"
    sqlitePath: "./src/data/voiceChannelNames.db", // Only needed for SQLite
    mysql: {
      host: "localhost",
      port: 3306,
      username: "your_mysql_user",
      password: "your_mysql_password",
      database: "voice_bot",
    },
    postgresql: {
      host: "localhost",
      port: 5432,
      username: "your_postgres_user",
      password: "your_postgres_password",
      database: "voice_bot",
    },
  },
  commands: {
    permit: "voice-permit", //Set the name of the command, don't use CAPITAL!
    adminPermit: "voice-adminpermit", //Set the name of the command, don't use CAPITAL!
    rename: "voice-rename", //Set the name of the command, don't use CAPITAL!
    removeName: "voice-removename", //Set the name of the command, don't use CAPITAL!
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
    setBitrate: 'voice-setbitrate',//Set the name of the command, don't use CAPITAL!
    sync: 'voice-sync',//Set the name of the command, don't use CAPITAL!
    unsync: 'voice-unsync',//Set the name of the command, don't use CAPITAL!
  },
};
