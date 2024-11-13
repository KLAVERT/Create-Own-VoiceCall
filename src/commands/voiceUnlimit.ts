import { CommandInteraction, GuildMember, PermissionFlagsBits } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranlation';

function formatMessage(template: string, ...args: string[]): string {
  let i = 0;
  return template.replace(/%s/g, () => args[i++] || "");
}

export async function voiceUnlimitCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceUnlimit.mustBeInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);
  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voiceUnlimit.noCreator,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voiceUnlimit.noPermissions,
      ephemeral: true,
    });
  }

  try {
    await voiceChannel.setUserLimit(0);

    return interaction.reply({
      content: formatMessage(mainTranlation.messages.voiceUnlimit.succesfull, voiceChannel.name),
    });
  } catch (error) {
    if (config.general.debugger === true) {
      console.error('Error removing user limit on voice channel:', error);
    }

    return interaction.reply({
      content: mainTranlation.messages.voiceUnlimit.error,
      ephemeral: true,
    });
  }
}
