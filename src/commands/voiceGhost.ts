import { CommandInteraction, GuildMember, PermissionFlagsBits } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranlation';

function formatMessage(template: string, ...args: string[]): string {
  let i = 0;
  return template.replace(/%s/g, () => args[i++] || "");
}

export async function voiceGhostCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const targetUser = interaction.options.get('user')?.user;
  const voiceChannel = member.voice.channel;

  if (!targetUser) {
    return interaction.reply({
      content: mainTranlation.messages.voiceGhost.provideUser,
      ephemeral: true,
    });
  }

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceGhost.mustBeInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voiceGhost.noClaimedChannel,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voiceGhost.noPermissions,
      ephemeral: true,
    });
  }

  channelInfo.ghostedUsers.add(targetUser.id);
  
  await voiceChannel.permissionOverwrites.edit(targetUser.id, {
    ViewChannel: false,
  });


  await interaction.reply({
    content: formatMessage(mainTranlation.messages.voiceGhost.success, targetUser.tag, voiceChannel.name),
  });

  try {
    const dmChannel = await targetUser.createDM();
    await dmChannel.send(formatMessage(mainTranlation.messages.voiceGhost.hiddenFromOthers, voiceChannel.name));
  } catch (error) {
    if (config.general.debugger === true) {
      console.log(`Could not send DM to the ghosted user: ${targetUser.tag}`);
    }
  }
}
