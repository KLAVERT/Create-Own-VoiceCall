import { CommandInteraction, GuildMember } from 'discord.js';
import { clearStorage } from '../utils/storageManager';
import config from '../config';
import translation from '../translations/mainTranslation';

export async function voiceRemoveNameCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;

  if (!member) {
    return interaction.reply({
      content: translation.messages.voiceRemoveName.mustBeMember,
      ephemeral: true,
    });
  }

  try {
    await clearStorage(member.id);

    return interaction.reply({
      content: translation.messages.voiceRemoveName.success,
      ephemeral: true,
    });
  } catch (error) {
    if (config.general.debugger) {
      console.error('Error removing the voice channel name from storage:', error);
    }

    return interaction.reply({
      content: translation.messages.voiceRemoveName.error,
      ephemeral: true,
    });
  }
}
