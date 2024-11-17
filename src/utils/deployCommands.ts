import { SlashCommandBuilder, SlashCommandUserOption, SlashCommandStringOption, SlashCommandIntegerOption, SlashCommandRoleOption } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';

const createUserOption = (name: string, description: string) => {
  return new SlashCommandUserOption()
    .setName(name)
    .setDescription(description)
    .setRequired(true);
};

const createStringOption = (name: string, description: string, required: boolean = true) => {
  return new SlashCommandStringOption()
    .setName(name)
    .setDescription(description)
    .setRequired(required);
};

const createIntegerOption = (name: string, description: string, minValue: number, maxValue: number) => {
  return new SlashCommandIntegerOption()
    .setName(name)
    .setDescription(description)
    .setRequired(true)
    .setMinValue(minValue)
    .setMaxValue(maxValue);
};

const createRoleOption = (name: string, description: string, required: boolean = true) => {
  return new SlashCommandRoleOption()
    .setName(name)
    .setDescription(description)
    .setRequired(required);
};

const createCommand = (name: string, description: string, options: (SlashCommandUserOption | SlashCommandStringOption | SlashCommandIntegerOption | SlashCommandRoleOption)[] = []) => {
  const command = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

  options.forEach(option => {
    if (option instanceof SlashCommandUserOption) {
      command.addUserOption(option);
    } else if (option instanceof SlashCommandStringOption) {
      command.addStringOption(option);
    } else if (option instanceof SlashCommandIntegerOption) {
      command.addIntegerOption(option);
    } else if (option instanceof SlashCommandRoleOption) {
      command.addRoleOption(option);
    }
  });

  return command.toJSON();
};

const commands = [
  createCommand(config.commands.adminPermit, mainTranlation.commands.adminPermitDescription, [
    createUserOption(mainTranlation.commands.adminPermitUser, mainTranlation.commands.adminPermitUserDescription),
    createStringOption(mainTranlation.commands.adminPermitChannelName, mainTranlation.commands.adminPermitChannelNameDescription),
  ]),
  createCommand(config.commands.permit, mainTranlation.commands.permitDescription, [
    createUserOption(mainTranlation.commands.permitUser, mainTranlation.commands.permitUserDescription)
  ]),
  createCommand(config.commands.rename, mainTranlation.commands.renameDescription, [
    createStringOption(mainTranlation.commands.newName, mainTranlation.commands.newNameDescription)
  ]),
  createCommand(config.commands.public, mainTranlation.commands.publicDescription),
  createCommand(config.commands.private, mainTranlation.commands.privateDescription),
  createCommand(config.commands.limit, mainTranlation.commands.limitDescription, [
    createIntegerOption(mainTranlation.commands.limit, mainTranlation.commands.limitOptionDescription, 0, 99)
  ]),
  createCommand(config.commands.unlimit, mainTranlation.commands.unlimitDescription),
  createCommand(config.commands.transfer, mainTranlation.commands.transferDescription, [
    createUserOption(mainTranlation.commands.TransferName, mainTranlation.commands.TransferNameDescription)
  ]),
  createCommand(config.commands.claim, mainTranlation.commands.claimDescription),
  createCommand(config.commands.reject, mainTranlation.commands.rejectDescription, [
    createUserOption(mainTranlation.commands.permitUser, mainTranlation.commands.rejectNameDescription)
  ]),
  createCommand(config.commands.disconnect, mainTranlation.commands.disconnectDescription, [
    createUserOption(mainTranlation.commands.permitUser, mainTranlation.commands.disconnectUserDescription)
  ]),
  createCommand(config.commands.addOwner, mainTranlation.commands.addCoOwnerDescription, [
    createUserOption(mainTranlation.commands.permitUser, mainTranlation.commands.addCoOwnerNameDescription)
  ]),
  createCommand(config.commands.removeOwner, mainTranlation.commands.removeCoOwnerDescription, [
    createUserOption(mainTranlation.commands.permitUser, mainTranlation.commands.removeCoOwnerNameDescription)
  ]),
  createCommand(config.commands.unghost, mainTranlation.commands.unghostDescription, [
    createUserOption(mainTranlation.commands.unghostUser, mainTranlation.commands.unghostUserDescription),
  ]),
  createCommand(config.commands.ghost, mainTranlation.commands.ghostDescription, [
    createUserOption(mainTranlation.commands.ghostUser, mainTranlation.commands.ghostUserDescription),
  ]),
  createCommand(config.commands.ghostAll, mainTranlation.commands.ghostAllDescription),
  createCommand(config.commands.unGhostAll, mainTranlation.commands.unGhostAllDescription),
  createCommand(config.commands.removeName, mainTranlation.commands.removeNameDescription),
  createCommand(config.commands.setBitrate, mainTranlation.commands.setBitrateDescription, [
    createIntegerOption('bitrate', mainTranlation.commands.setBitrateOptionDescription, 8, 96),
  ]),
  createCommand(config.commands.sync, mainTranlation.commands.syncDescription, [
    createRoleOption(mainTranlation.commands.syncRole, mainTranlation.commands.syncRoleDescription)
  ]),
  createCommand(config.commands.unsync, mainTranlation.commands.unsyncDescription, [
    createRoleOption(mainTranlation.commands.unsyncRole, mainTranlation.commands.unsyncRoleDescription)
  ]),
];

const rest = new REST({ version: '9' }).setToken(config.token.DiscordToken);

(async () => {
  try {
    if (config.general.debugger === true) {
      console.log('Started refreshing application (/) commands.');
    }
    await rest.put(
      Routes.applicationGuildCommands(config.general.clientID, config.general.guildID),
      { body: commands },
    );
    if (config.general.debugger === true) {
      console.log('Successfully reloaded application (/) commands.');
    }
  } catch (error) {
    console.error(error);
  }
})();
