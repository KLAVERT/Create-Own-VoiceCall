import { CommandInteraction, GuildMember, PermissionFlagsBits } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';
import formatMessage from '../utils/formatMessage';

export async function voiceUnGhostAllCommand(interaction: CommandInteraction) {
  try {
    if (!interaction.guild) {
      return interaction.reply({
        content: 'This command can only be used within a server.',
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.editReply({
        content: mainTranlation.messages.voiceUnGhostAll.mustBeInVoice,
      });
    }

    const channelInfo = userChannels.get(voiceChannel.id);

    if (!channelInfo) {
      return interaction.editReply({
        content: mainTranlation.messages.voiceUnGhostAll.noClaimedChannel,
      });
    }

    const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
    const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

    if (!isOwnerOrCoOwner && !hasAdminPermission) {
      return interaction.editReply({
        content: mainTranlation.messages.voiceUnGhostAll.noPermissions,
      });
    }

    await voiceChannel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {
      ViewChannel: true,
    });

    const allowedUsers = [channelInfo.creatorId, ...Array.from(channelInfo.coOwners)];
    for (const userId of allowedUsers) {
      await voiceChannel.permissionOverwrites.edit(userId, {
        ViewChannel: true,
        Connect: true,
      });
    }

    const permittedUsers = channelInfo.permittedUsers || [];
    for (const userId of permittedUsers) {
      await voiceChannel.permissionOverwrites.edit(userId, {
        ViewChannel: true,
        Connect: true,
      });
    }

    await interaction.editReply({
      content: formatMessage(mainTranlation.messages.voiceUnGhostAll.success, voiceChannel.name),
    });

  } catch (error) {
    console.error('Error in unghosting all users:', error);
    if (config.general.debugger === true) {
      console.log('An error occurred while processing the unghostAll command.');
    }
  }
}
