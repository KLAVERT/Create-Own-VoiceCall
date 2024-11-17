import { Client, GatewayIntentBits } from 'discord.js';
import { setBotStatus } from './utils/statusManager';
import { checkBotVoice } from './utils/voiceCalls';
import { testDatabaseConnection } from './utils/testDatabase';
import config from './config';
import './utils/deployCommands';
import { checkForUpdate } from './utils/checkUpdate';
import * as commands from './utils/importCommands';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const commandHandlers: { [key: string]: Function } = {
    [config.commands.permit]: commands.permitCommand,
    [config.commands.adminPermit]: commands.permitAdminCommand,
    [config.commands.rename]: commands.voiceRenameCommand,
    [config.commands.public]: commands.voicePublicCommand,
    [config.commands.private]: commands.voicePrivateCommand,
    [config.commands.limit]: commands.voiceLimitCommand,
    [config.commands.unlimit]: commands.voiceUnlimitCommand,
    [config.commands.transfer]: commands.voiceTransferCommand,
    [config.commands.claim]: commands.voiceClaimCommand,
    [config.commands.reject]: commands.voiceRejectCommand,
    [config.commands.disconnect]: commands.voiceDisconnectCommand,
    [config.commands.addOwner]: commands.voiceAddOwnerCommand,
    [config.commands.removeOwner]: commands.voiceRemoveOwnerCommand,
    [config.commands.unghost]: commands.voiceUnghostCommand,
    [config.commands.ghost]: commands.voiceGhostCommand,
    [config.commands.ghostAll]: commands.voiceGhostAllCommand,
    [config.commands.unGhostAll]: commands.voiceUnGhostAllCommand,
    [config.commands.setBitrate]: commands.voiceSetBitrateCommand,
    [config.commands.sync]: commands.voiceSyncCommand,
    [config.commands.unsync]: commands.voiceUnsyncCommand,
    [config.commands.removeName]: commands.voiceRemoveNameCommand,
  };

  const handler = commandHandlers[interaction.commandName];
  if (handler) {
    try {
      await handler(interaction, client);
    } catch (error) {
      console.error(`Error while executing command '${interaction.commandName}':`, error);
      await interaction.reply({
        content: 'An error occurred while executing this command.',
        ephemeral: true,
      });
    }
  }
});

client.once('ready', async () => {
  console.log('Bot is starting up...');
  await testDatabaseConnection();
  setBotStatus(client);
  checkBotVoice(client, config.voice.voiceJoinChannel, config.voice.voiceJoinCategory);
  checkForUpdate();
  console.log('Bot successfully started and is ready for use!');
});

client.login(config.token.DiscordToken);
