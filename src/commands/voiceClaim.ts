import { CommandInteraction, GuildMember, VoiceChannel, PermissionFlagsBits } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranlation';

export async function voiceClaimCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceClaim.joinVoice,
      ephemeral: true,
    });
  }

  if (!(voiceChannel instanceof VoiceChannel)) {
    return interaction.reply({
      content: mainTranlation.messages.voiceClaim.voiceChannel,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo) {
    return interaction.reply({
      content: mainTranlation.messages.voiceClaim.notClaimed,
      ephemeral: true,
    });
  }

  const owner = channelInfo.creatorId;

  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (hasAdminPermission || !voiceChannel.members.has(owner)) {
    try {
      userChannels.set(voiceChannel.id, {
        creatorId: member.id,
        channel: voiceChannel,
        coOwners: new Set(),
        permittedUsers: new Set(),
        ghostedUsers: new Set(),
      });

      await interaction.reply({
        content: mainTranlation.messages.voiceClaim.claimedOwner + `"${voiceChannel.name}"`,
      });

      try {
        const dmChannel = await member.user.createDM();
        await dmChannel.send(mainTranlation.messages.voiceClaim.youTheOwner + `"${voiceChannel.name}".`);
      } catch (error) {
        if (config.general.debugger === true) {
          console.log(`Could not send DM to the new owner: ${member.user.tag}`);
        }
      }
    } catch (error) {
      if (config.general.debugger === true) {
        console.error('Error transferring ownership:', error);
      }
      return interaction.reply({
        content: mainTranlation.messages.voiceClaim.errorClaim,
        ephemeral: true,
      });
    }
  } else {
    return interaction.reply({
      content: mainTranlation.messages.voiceClaim.ownerInVoice,
      ephemeral: true,
    });
  }
}
