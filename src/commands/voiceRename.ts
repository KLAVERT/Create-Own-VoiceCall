import { CommandInteraction, GuildMember, PermissionFlagsBits, VoiceChannel } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import { saveChannelName } from '../utils/storageManager';
import config from '../config';
import mainTranslation from '../translations/mainTranslation';
import formatMessage from '../utils/formatMessage';

export async function voiceRenameCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const newName = interaction.options.get('new_name')?.value as string;

  if (!newName) {
    return interaction.reply({
      content: mainTranslation.messages.voiceRename.newName,
      ephemeral: true,
    });
  }

  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranslation.messages.voiceRename.mustBeInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranslation.messages.voiceRename.noCreator,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranslation.messages.voiceRename.noPermissions,
      ephemeral: true,
    });
  }

  try {
    await voiceChannel.setName(newName);
    await saveChannelName(member.id, newName);
    return interaction.reply({
      content: formatMessage(mainTranslation.messages.voiceRename.succesfull, newName),
    });
  } catch (error) {
    if (config.general.debugger) {
      console.error('Error renaming the voice channel:', error);
    }
    return interaction.reply({
      content: mainTranslation.messages.voiceRename.error,
      ephemeral: true,
    });
  }
}
