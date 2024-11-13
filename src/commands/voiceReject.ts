import { CommandInteraction, GuildMember, PermissionFlagsBits, } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranlation';

function formatMessage(template: string, ...args: string[]): string {
  let i = 0;
  return template.replace(/%s/g, () => args[i++] || "");
}

export async function voiceRejectCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.MustBeInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.noCreator,
      ephemeral: true,
    });
  }

  const isOwner = channelInfo.creatorId === member.id;
  const isCoOwner = channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  const userToReject = interaction.options.get('user')?.user;

  if (!userToReject) {
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.mustSpecify,
      ephemeral: true,
    });
  }

  if (channelInfo.ghostedUsers.has(userToReject.id)) {
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.userIsGhosted,
      ephemeral: true,
    });
  }

  const memberToReject = voiceChannel.members.get(userToReject.id);
  if (!memberToReject) {
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.notInSameVoice,
      ephemeral: true,
    });
  }

  if (isCoOwner && (userToReject.id === channelInfo.creatorId || memberToReject.permissions.has(PermissionFlagsBits.Administrator))) {
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.noOwnerReject,
      ephemeral: true,
    });
  }

  if (isOwner && memberToReject.permissions.has(PermissionFlagsBits.Administrator)) {
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.noAdminReject,
      ephemeral: true,
    });
  }

  if (!isOwner && !isCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.noPermissions,
      ephemeral: true,
    });
  }

  try {
    if (memberToReject) {
      await memberToReject.voice.disconnect();
      if (config.general.debugger) {
        console.log(`Disconnected ${userToReject.tag} from the voice channel.`);
      }
    }

    channelInfo.ghostedUsers.add(userToReject.id);

    await voiceChannel.permissionOverwrites.edit(userToReject.id, {
      Connect: false,
    });

    await interaction.reply({
      content: formatMessage(mainTranlation.messages.voiceReject.succesfull, userToReject.tag, voiceChannel.name),
    });

    try {
      const dmChannel = await userToReject.createDM();
      await dmChannel.send(formatMessage(mainTranlation.messages.voiceReject.rejectedByOwner, voiceChannel.name));
    } catch (error) {
      if (config.general.debugger) {
        console.log(`Could not send DM to the rejected user: ${userToReject.tag}`);
      }
    }

  } catch (error) {
    console.error('Error rejecting user:', error);
    return interaction.reply({
      content: mainTranlation.messages.voiceReject.error,
      ephemeral: true,
    });
  }
}

