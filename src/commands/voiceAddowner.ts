import { CommandInteraction, GuildMember, VoiceChannel } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import mainTranlation from '../translations/mainTranslation';

function formatMessage(template: string, ...args: string[]): string {
  let i = 0;
  return template.replace(/%s/g, () => args[i++] || "");
}

export async function voiceAddOwnerCommand(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember;
  const voiceChannel = member.voice.channel as VoiceChannel;

  if (!voiceChannel) {
    return interaction.reply({
      content: mainTranlation.messages.voiceAddOwner.mustBeVoice,
      ephemeral: true,
    });
  }

  const channelInfo = userChannels.get(voiceChannel.id);

  if (!channelInfo || channelInfo.creatorId !== member.id) {
    return interaction.reply({
      content: mainTranlation.messages.voiceAddOwner.noPermission,
      ephemeral: true,
    });
  }

  const userToAdd = interaction.options.get('user')?.user;
  if (!userToAdd) {
    return interaction.reply({
      content: mainTranlation.messages.voiceAddOwner.needUser,
      ephemeral: true,
    });
  }

  if (channelInfo.coOwners.has(userToAdd.id)) {
    return interaction.reply({
      content: formatMessage(mainTranlation.messages.voiceAddOwner.alreadyOwner, userToAdd.tag),
      ephemeral: true,
    });
  }

  channelInfo.coOwners.add(userToAdd.id);

  await voiceChannel.permissionOverwrites.edit(userToAdd.id, {
    Connect: true,
    ManageChannels: true,
  });

  return interaction.reply({
    content: formatMessage(mainTranlation.messages.voiceAddOwner.succesfullAdded, userToAdd.tag, voiceChannel.name),
  });
}
