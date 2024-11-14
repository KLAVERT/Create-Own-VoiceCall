import { ChatInputCommandInteraction, Client, Role, PermissionsBitField } from 'discord.js';
import translations from '../translations/mainTranslation';
import { userChannels } from '../utils/voiceCalls';
import formatMessage from '../utils/formatMessage';

export const voiceUnsyncCommand = async (interaction: ChatInputCommandInteraction, client: Client) => {
  const member = interaction.member;
  if (!member || !interaction.guild) {
    await interaction.reply({ content: translations.messages.voiceUnsync.noGuildOrMember, ephemeral: true });
    return;
  }

  const voiceChannel = (member as any).voice?.channel;
  if (!voiceChannel) {
    await interaction.reply({ content: translations.messages.voiceUnsync.notInVoiceChannel, ephemeral: true });
    return;
  }

  const channelInfo = userChannels.get(voiceChannel.id);
  const isAdmin = (member.permissions as PermissionsBitField).has(PermissionsBitField.Flags.Administrator);

  if (!channelInfo || (channelInfo.creatorId !== member.user.id && !channelInfo.coOwners.has(member.user.id) && !isAdmin)) {
    await interaction.reply({ content: translations.messages.voiceUnsync.noPermission, ephemeral: true });
    return;
  }

  const role = interaction.options.getRole('role') as Role;
  if (!role) {
    await interaction.reply({ content: translations.messages.voiceUnsync.noRoleProvided, ephemeral: true });
    return;
  }

  try {
    await voiceChannel.permissionOverwrites.delete(role.id);

    await interaction.reply({ content: formatMessage(translations.messages.voiceUnsync.success, role.name, voiceChannel.name) });
  } catch (error) {
    console.error('Error while unsyncing the role', error);
    await interaction.reply({ content: translations.messages.voiceUnsync.error, ephemeral: true });
  }
};
