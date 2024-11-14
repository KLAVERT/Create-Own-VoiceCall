import { CommandInteraction, GuildMember, PermissionsBitField } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranslation from '../translations/mainTranslation';
import formatMessage from '../utils/formatMessage';

export async function voiceDisconnectCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranslation.messages.voiceDisconnect.mustBeVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranslation.messages.voiceDisconnect.notClaimed,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionsBitField.Flags.Administrator);
  
  const userToDisconnect = interaction.options.get('user')?.user;

  if (!userToDisconnect) {
    return interaction.reply({
      content: mainTranslation.messages.voiceDisconnect.userNeeded,
      ephemeral: true,
    });
  }

  const memberToDisconnect = voiceChannel.members.get(userToDisconnect.id);
  if (!memberToDisconnect) {
    return interaction.reply({
      content: mainTranslation.messages.voiceDisconnect.sameVoice,
      ephemeral: true,
    });
  }

  const isUserAdmin = memberToDisconnect.permissions.has(PermissionsBitField.Flags.Administrator);
  const isOwner = channelInfo.creatorId === memberToDisconnect.id;

  if (isOwnerOrCoOwner && !hasAdminPermission && (isOwner || isUserAdmin)) {
    return interaction.reply({
      content: mainTranslation.messages.voiceDisconnect.noPermission,
      ephemeral: true,
    });
  }

  if (channelInfo.creatorId === member.id && isUserAdmin) {
    return interaction.reply({
      content: mainTranslation.messages.voiceDisconnect.ownerNoPermission,
      ephemeral: true,
    });
  }

  try {
    await memberToDisconnect.voice.disconnect();
    if (config.general.debugger) {
      console.log(`Disconnected ${userToDisconnect.tag} from the voice channel.`);
    }

    await interaction.reply({
      content: formatMessage(
        mainTranslation.messages.voiceDisconnect.disconnectSuccess,
        userToDisconnect.tag,
        voiceChannel.name
      ),
    });

    try {
      const dmChannel = await userToDisconnect.createDM();
      await dmChannel.send(formatMessage(mainTranslation.messages.voiceDisconnect.youHaveBeenDisconnected, voiceChannel.name));
    } catch (error) {
      if (config.general.debugger === true) {
        console.log(`Could not send DM to the disconnected user: ${userToDisconnect.tag}`);
      }
    }

  } catch (error) {
    if (config.general.debugger === true) {
      console.error('Error disconnecting user:', error);
    }
    return interaction.reply({
      content: mainTranslation.messages.voiceDisconnect.disconnectError,
      ephemeral: true,
    });
  }
}
