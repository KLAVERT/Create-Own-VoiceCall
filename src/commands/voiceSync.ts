import { ChatInputCommandInteraction, Client, Role, PermissionsBitField } from 'discord.js';
import translations from '../translations/mainTranslation';
import { userChannels } from '../utils/voiceCalls';
import formatMessage from '../utils/formatMessage';
  
export const voiceSyncCommand = async (interaction: ChatInputCommandInteraction, client: Client) => {
  const member = interaction.member;
  if (!member || !interaction.guild) {
    await interaction.reply({ content: translations.messages.voiceSync.noGuildOrMember, ephemeral: true });
    return;
  }

  const voiceChannel = (member as any).voice?.channel;
  if (!voiceChannel) {
    await interaction.reply({ content: translations.messages.voiceSync.notInVoiceChannel, ephemeral: true });
    return;
  }

  const channelInfo = userChannels.get(voiceChannel.id);
  const isAdmin = (member.permissions as PermissionsBitField).has(PermissionsBitField.Flags.Administrator);
  
  if (!channelInfo || (channelInfo.creatorId !== member.user.id && !channelInfo.coOwners.has(member.user.id) && !isAdmin)) {
    await interaction.reply({ content: translations.messages.voiceSync.noPermission, ephemeral: true });
    return;
  }

  const role = interaction.options.getRole('role') as Role;
  if (!role) {
    await interaction.reply({ content: translations.messages.voiceSync.noRoleProvided, ephemeral: true });
    return;
  }

  try {
    await voiceChannel.permissionOverwrites.edit(role.id, {
      Connect: true,
    });

    await interaction.reply({ content: formatMessage(translations.messages.voiceSync.success, role.name, voiceChannel.name) });
  } catch (error) {
    console.error('Error while syncing the role', error);
    await interaction.reply({ content: translations.messages.voiceSync.error, ephemeral: true });
  }
};
