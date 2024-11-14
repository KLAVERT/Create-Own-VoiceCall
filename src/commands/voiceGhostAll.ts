import { CommandInteraction, GuildMember, PermissionFlagsBits } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';
import formatMessage from '../utils/formatMessage';

export async function voiceGhostAllCommand(interaction: CommandInteraction) {
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
          content: mainTranlation.messages.voiceGhostAll.mustBeInVoice,
        });
      }
  
      const channelInfo = userChannels.get(voiceChannel.id);
  
      if (!channelInfo) {
        return interaction.editReply({
          content: mainTranlation.messages.voiceGhostAll.noClaimedChannel,
        });
      }
  
      const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
      const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);
  
      if (!isOwnerOrCoOwner && !hasAdminPermission) {
        return interaction.editReply({
          content: mainTranlation.messages.voiceGhostAll.noPermissions,
        });
      }
  
      await voiceChannel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {
        ViewChannel: false,
        Connect: false,
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
        content: formatMessage(mainTranlation.messages.voiceGhostAll.success, voiceChannel.name),
      });
  
    } catch (error) {
      console.error('Error in ghosting all users:', error);
      if (config.general.debugger === true) {
        console.log('An error occurred while processing the ghostAll command.');
      }
    }
  }
  
