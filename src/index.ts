import { Client, GatewayIntentBits } from 'discord.js';
import { setBotStatus } from './utils/statusManager';
import { checkBotVoice } from './utils/voiceCalls';
import config from './config';
import { permitCommand } from './commands/voicePermit';
import './utils/deployCommands';
import { permitAdminCommand } from './commands/voicePermitAdmin';
import { voiceRenameCommand } from './commands/voiceRename';
import { voicePublicCommand } from './commands/voicePublic';
import { voicePrivateCommand } from './commands/voicePrivate';
import { voiceLimitCommand } from './commands/voiceLimit';
import { voiceUnlimitCommand } from './commands/voiceUnlimit';
import { voiceTransferCommand } from './commands/voiceTransfer';
import { voiceClaimCommand } from './commands/voiceClaim';
import { voiceRejectCommand } from './commands/voiceReject';
import { voiceDisconnectCommand } from './commands/voiceDisconnect';
import { voiceAddOwnerCommand } from './commands/voiceAddowner';
import { voiceRemoveOwnerCommand } from './commands/voiceRemoveowner';
import { voiceUnghostCommand } from './commands/voiceUnghost';
import { voiceGhostCommand } from './commands/voiceGhost';
import { voiceGhostAllCommand } from './commands/voiceGhostAll';
import { voiceUnGhostAllCommand } from './commands/voiceUnghostAll';
import { voiceSetBitrateCommand } from './commands/voiceSetBitrate';
import { checkForUpdate } from './utils/checkUpdate';

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
    [config.commands.permit]: permitCommand,
    [config.commands.adminPermit]: permitAdminCommand,
    [config.commands.rename]: voiceRenameCommand,
    [config.commands.public]: voicePublicCommand,
    [config.commands.private]: voicePrivateCommand,
    [config.commands.limit]: voiceLimitCommand,
    [config.commands.unlimit]: voiceUnlimitCommand,
    [config.commands.transfer]: voiceTransferCommand,
    [config.commands.claim]: voiceClaimCommand,
    [config.commands.reject]: voiceRejectCommand,
    [config.commands.disconnect]: voiceDisconnectCommand,
    [config.commands.addOwner]: voiceAddOwnerCommand,
    [config.commands.removeOwner]: voiceRemoveOwnerCommand,
    [config.commands.unghost]: voiceUnghostCommand,
    [config.commands.ghost]: voiceGhostCommand,
    [config.commands.ghostAll]: voiceGhostAllCommand,
    [config.commands.unGhostAll]: voiceUnGhostAllCommand,
    [config.commands.setBitrate]: voiceSetBitrateCommand,
  };
  
  const handler = commandHandlers[interaction.commandName];
  if (handler) {
    await handler(interaction, client);
  }
});

client.once('ready', async () => {
  setBotStatus(client);
  checkBotVoice(client, config.voice.voiceJoinChannel, config.voice.voiceJoinCategory);
  checkForUpdate();
  console.log('Bot is logged in and ready!');
});

client.login(config.token.DiscordToken);
