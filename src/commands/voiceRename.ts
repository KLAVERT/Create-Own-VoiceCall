import { CommandInteraction, GuildMember, PermissionFlagsBits, VoiceChannel } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranlation';

function formatMessage(template: string, ...args: string[]): string {
  let i = 0;
  return template.replace(/%s/g, () => args[i++] || "");
}

export async function voiceRenameCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const newName = interaction.options.get('new_name')?.value as string;

  if (!newName) {
    return interaction.reply({
      content: mainTranlation.messages.voiceRename.newName,
      ephemeral: true,
    });
  }

  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceRename.mustBeInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voiceRename.noCreator,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voiceRename.noPermissions,
      ephemeral: true,
    });
  }

  try {
    await voiceChannel.setName(newName);
    return interaction.reply({
      content: formatMessage(mainTranlation.messages.voiceRename.succesfull, newName),
    });
  } catch (error) {
    if (config.general.debugger == true) {
      console.error('Error renaming the voice channel:', error);
    }
    return interaction.reply({
      content: mainTranlation.messages.voiceRename.error,
      ephemeral: true,
    });
  }
}
