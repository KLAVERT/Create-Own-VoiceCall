import { CommandInteraction, GuildMember, User } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';
import formatMessage from '../utils/formatMessage';

export async function voiceRemoveOwnerCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const userToRemove = interaction.options.get('user')?.user;

  if (!userToRemove) {
    return interaction.reply({
      content: mainTranlation.messages.voiceRemoveOwner.mustSpecify,
      ephemeral: true,
    });
  }

  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceRemoveOwner.mustBeInCall,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo || channelInfo.creatorId !== member.id) {
    return interaction.reply({
      content: mainTranlation.messages.voiceRemoveOwner.noPermissions,
      ephemeral: true,
    });
  }

  if (!channelInfo.coOwners.has(userToRemove.id)) {
    return interaction.reply({
      content: formatMessage(mainTranlation.messages.voiceRemoveOwner.noCoOwner, userToRemove.tag),
      ephemeral: true,
    });
  }

  try {
    channelInfo.coOwners.delete(userToRemove.id);

    await interaction.reply({
      content: formatMessage(mainTranlation.messages.voiceRemoveOwner.succesfull, userToRemove.tag, voiceChannel.name),
    });

    try {
      const dmChannel = await userToRemove.createDM();
      await dmChannel.send(formatMessage(mainTranlation.messages.voiceRemoveOwner.removedByOwner, voiceChannel.name));
    } catch (error) {
      console.log(`Could not send DM to the removed co-owner: ${userToRemove.tag}`);
    }

  } catch (error) {
    if (config.general.debugger === true) {
      console.error('Error removing co-owner:', error);
    }

    return interaction.reply({
      content: mainTranlation.messages.voiceRemoveOwner.error,
      ephemeral: true,
    });
  }
}
