import { CommandInteraction, GuildMember, PermissionsBitField } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';
import formatMessage from '../utils/formatMessage';

export async function voiceLimitCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const userLimitOption = interaction.options.get('limit')?.value;
  const userLimit = userLimitOption ? parseInt(userLimitOption.toString(), 10) : null;

  if (userLimit === null || isNaN(userLimit) || userLimit < 0 || userLimit > 99) {
    return interaction.reply({
      content: mainTranlation.messages.voiceLimit.validLimit,
      ephemeral: true,
    });
  }

  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceLimit.inVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);
  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voiceLimit.notClaimed,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionsBitField.Flags.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voiceLimit.noPerms,
      ephemeral: true,
    });
  }

  try {
    await voiceChannel.setUserLimit(userLimit);

    return interaction.reply({
      content: formatMessage(
        mainTranlation.messages.voiceLimit.limitChange,
        voiceChannel.name,
        userLimit === 0 ? mainTranlation.messages.voiceLimit.noLimit : userLimit.toString()
      ),
    });
  } catch (error) {
    if (config.general.debugger === true) {
      console.error('Error setting user limit on voice channel:', error);
    }
    return interaction.reply({
      content: mainTranlation.messages.voiceLimit.tryAgain,
      ephemeral: true,
    });
  }
}
