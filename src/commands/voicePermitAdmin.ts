import { CommandInteraction, PermissionFlagsBits, GuildMember, VoiceChannel } from 'discord.js';
import { Client } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import config from '../config';
import mainTranlation from '../translations/mainTranslation';

function formatMessage(template: string, ...args: string[]): string {
  let i = 0;
  return template.replace(/%s/g, () => args[i++] || "");
}

export async function permitAdminCommand(interaction: CommandInteraction, client: Client) {
  const member = interaction.member as GuildMember;

  const targetUser = interaction.options.get('user')?.user;
  const targetChannelName = interaction.options.get('channel_name')?.value as string;

  if (!targetUser || !targetChannelName) {
    return interaction.reply({
      content: mainTranlation.messages.voicePermitAdmin.provide,
      ephemeral: true,
    });
  }

  const targetChannelData = [...userChannels.values()].find(
    (channelData) => channelData.channel.name === targetChannelName
  );

  if (!targetChannelData) {
    return interaction.reply({
      content: formatMessage(mainTranlation.messages.voicePermitAdmin.noChannel, targetChannelName),
      ephemeral: true,
    });
  }

  const targetChannel = targetChannelData.channel;
  if (!(targetChannel instanceof VoiceChannel)) {
    return interaction.reply({
      content: mainTranlation.messages.voicePermitAdmin.specifiedChannel,
      ephemeral: true,
    });
  }

  const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);

  if (!hasAdminPermission) {
    return interaction.reply({
      content: mainTranlation.messages.voicePermitAdmin.noPermission,
      ephemeral: true,
    });
  }

  try {
    await targetChannel.permissionOverwrites.edit(targetUser.id, {
      Connect: true,
    });

    targetChannelData.permittedUsers.add(targetUser.id);

    return interaction.reply({
      content: formatMessage(mainTranlation.messages.voicePermitAdmin.succesfull, targetUser.tag, targetChannel.name),
    });
  } catch (error) {
    if (config.general.debugger) {
      console.error('Error permitting user to join the voice channel:', error);
    }
    return interaction.reply({
      content: mainTranlation.messages.voicePermitAdmin.error,
      ephemeral: true,
    });
  }
}
