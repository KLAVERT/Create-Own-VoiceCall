import { CommandInteraction, GuildMember, PermissionFlagsBits } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';
import formatMessage from '../utils/formatMessage';

export async function voicePrivateCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voicePrivate.mustBeInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voicePrivate.noCreator,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voicePrivate.noPermission,
      ephemeral: true,
    });
  }

  try {
    await voiceChannel.permissionOverwrites.edit(voiceChannel.guild.roles.everyone, {
      Connect: false,
    });

    return interaction.reply({
      content: formatMessage(mainTranlation.messages.voicePrivate.succesfull, voiceChannel.name),
    });
  } catch (error) {
    if (config.general.debugger === true) {
      console.error('Error making voice channel private:', error);
    }
    return interaction.reply({
      content: mainTranlation.messages.voicePrivate.error,
      ephemeral: true,
    });
  }
}
