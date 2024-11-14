import { CommandInteraction, GuildMember, PermissionFlagsBits, VoiceChannel } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';

function formatMessage(template: string, ...args: string[]): string {
  let i = 0;
  return template.replace(/%s/g, () => args[i++] || "");
}

export async function voiceTransferCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const targetUser = interaction.options.get('new_owner')?.user;

  if (!targetUser) {
    return interaction.reply({
      content: mainTranlation.messages.voiceTransfer.provide,
      ephemeral: true,
    });
  }

  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceTransfer.mustBeInVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voiceTransfer.noCreator,
      ephemeral: true,
    });
  }

  const isOwnerOrCoOwner = channelInfo.creatorId === member.id || channelInfo.coOwners.has(member.id);
  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!isOwnerOrCoOwner && !hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voiceTransfer.noPermissions,
      ephemeral: true,
    });
  }

  if (targetUser.id !== member.id && !voiceChannel.members.has(targetUser.id)) {
    return interaction.reply({
      content: mainTranlation.messages.voiceTransfer.notInVoice,
      ephemeral: true,
    });
  }

  try {
    userChannels.set(voiceChannel.id, { 
      creatorId: targetUser.id, 
      coOwners: channelInfo.coOwners, 
      channel: voiceChannel as VoiceChannel, 
      permittedUsers: new Set(),
      ghostedUsers: new Set(),
    });

    await interaction.reply({
      content: formatMessage(mainTranlation.messages.voiceTransfer.succesfull, voiceChannel.name, targetUser.tag),
    });

    try {
      const dmChannel = await targetUser.createDM();
      await dmChannel.send(formatMessage(mainTranlation.messages.voiceTransfer.newOwner, voiceChannel.name));
    } catch (error) {
      if (config.general.debugger === true) {
        console.log(`Could not send DM to the new owner: ${targetUser.tag}`);
      }
    }

  } catch (error) {
    if (config.general.debugger === true) {
      console.error('Error transferring ownership:', error);
    }
    return interaction.reply({
      content: mainTranlation.messages.voiceTransfer.error,
      ephemeral: true,
    });
  }
}
