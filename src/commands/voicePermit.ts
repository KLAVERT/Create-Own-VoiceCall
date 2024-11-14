import { CommandInteraction, PermissionFlagsBits, GuildMember, Client } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';
import formatMessage from '../utils/formatMessage';

export async function permitCommand(interaction: CommandInteraction, client: Client) {
  const member = interaction.member as GuildMember;
  const targetUser = interaction.options.get('user')?.user;

  if (!targetUser) {
    return interaction.reply({
      content: mainTranlation.messages.voicePermit.provide,
      ephemeral: true,
    });
  }

  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voicePermit.mustInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voicePermit.noCreator,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voicePermit.permission,
      ephemeral: true,
    });
  }

  try {
    await voiceChannel.permissionOverwrites.edit(targetUser.id, {
      Connect: true,
      ViewChannel: true,
    });

    channelInfo.permittedUsers.add(targetUser.id);

    return interaction.reply({
      content: formatMessage(mainTranlation.messages.voicePermit.succesfullPermit, targetUser.tag, voiceChannel.name),
    });
  } catch (error) {
    if (config.general.debugger) {
      console.error('Error permitting user to join the voice channel:', error);
    }
    return interaction.reply({
      content: mainTranlation.messages.voicePermit.error,
      ephemeral: true,
    });
  }
}
