import { CommandInteraction, GuildMember, PermissionFlagsBits } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';

function formatMessage(template: string, ...args: string[]): string {
  let i = 0;
  return template.replace(/%s/g, () => args[i++] || "");
}

export async function voiceUnghostCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const targetUser = interaction.options.get('user')?.user;
  const voiceChannel = member.voice.channel;

  if (!targetUser) {
    return interaction.reply({
      content: mainTranlation.messages.voiceUnghost.provideUser,
      ephemeral: true,
    });
  }

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceUnghost.mustBeInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voiceUnghost.noClaimedChannel,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voiceUnghost.noPermissions,
      ephemeral: true,
    });
  }

  if (!channelInfo.ghostedUsers.has(targetUser.id)) {
    return interaction.reply({
      content: mainTranlation.messages.voiceUnghost.notGhosted,
      ephemeral: true,
    });
  }

  try {
    channelInfo.ghostedUsers.delete(targetUser.id);

    await voiceChannel.permissionOverwrites.edit(targetUser.id, {
      ViewChannel: true,
      Connect: true,
    });

    await voiceChannel.permissionOverwrites.edit(voiceChannel.guild.roles.everyone.id, {
      Connect: null,
    });

    await interaction.reply({
      content: formatMessage(mainTranlation.messages.voiceUnghost.success, targetUser.tag, voiceChannel.name),
    });

    try {
      const dmChannel = await targetUser.createDM();
      await dmChannel.send(formatMessage(mainTranlation.messages.voiceUnghost.restoredAccess, voiceChannel.name));
    } catch (error) {
      if (config.general.debugger === true) {
        console.log(`Could not send DM to the user: ${targetUser.tag}`);
      }
    }
  } catch (error) {
    console.error('Error unghosting user:', error);
    return interaction.reply({
      content: mainTranlation.messages.voiceUnghost.error,
      ephemeral: true,
    });
  }
}
