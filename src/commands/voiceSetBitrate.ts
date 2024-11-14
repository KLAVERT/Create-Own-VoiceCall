import { CommandInteraction, GuildMember, PermissionFlagsBits } from 'discord.js';
import { userChannels } from '../utils/voiceCalls';
import mainTranslation from '../translations/mainTranslation';

export async function voiceSetBitrateCommand(interaction: CommandInteraction) {
    try {
        if (!interaction.guild) {
            return interaction.reply({
                content: 'This command can only be used within a server.',
                ephemeral: true,
            });
        }

        await interaction.deferReply();

        const member = interaction.member as GuildMember;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.editReply({
                content: mainTranslation.messages.voiceSetBitrate.mustBeInVoice,
            });
        }

        const channelInfo = userChannels.get(voiceChannel.id);
        const isOwnerOrCoOwner = channelInfo && 
                                 (channelInfo.creatorId === member.id || 
                                  channelInfo.coOwners.has(member.id));

        const hasAdminPermission = member.permissions.has(PermissionFlagsBits.Administrator);
        if (!isOwnerOrCoOwner && !hasAdminPermission) {
            return interaction.editReply({
                content: mainTranslation.messages.voiceSetBitrate.noPermissions,
            });
        }

        const bitrate = interaction.options.get('bitrate')?.value as number;
        if (!bitrate || bitrate < 8 || bitrate > 96) {
            return interaction.editReply({
                content: mainTranslation.messages.voiceSetBitrate.invalidBitrate,
            });
        }

        const bitrateInBps = bitrate * 1000;

        await voiceChannel.setBitrate(bitrateInBps);

        return interaction.editReply({
            content: mainTranslation.messages.voiceSetBitrate.success.replace('%s', bitrate.toString()),
        });
    } catch (error) {
        console.error('Error setting channel bitrate:', error);
        interaction.editReply({
            content: mainTranslation.messages.voiceSetBitrate.error,
        });
    }
}
