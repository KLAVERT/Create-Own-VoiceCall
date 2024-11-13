import { Client, VoiceState, CategoryChannel, PermissionFlagsBits, VoiceChannel, ChannelType, GuildMember } from 'discord.js';
import config from '../config';

export const userChannels = new Map<string, { 
  creatorId: string;
  channel: VoiceChannel;
  coOwners: Set<string>;
  permittedUsers: Set<string>;
  ghostedUsers: Set<string>;
}>();

export function checkBotVoice(client: Client, targetChannelId: string, targetCategoryId: string) {
  client.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => {
    const guild = newState.guild;

    if (newState.channelId === targetChannelId && oldState.channelId !== targetChannelId) {
      const user = newState.member?.user;

      if (!user || !newState.member) {
        if (config.general.debugger) {
          console.log('User or member information is missing.');
        }
        return;
      }
      if (config.general.debugger) {
        console.log(`${user.username} has joined the monitored voice channel!`);
      }

      const category = guild.channels.cache.get(targetCategoryId) as CategoryChannel;
      if (!category || category.type !== ChannelType.GuildCategory) {
        if (config.general.debugger) {
          console.log('Target category not found or is not a valid category.');
        }
        return;
      }

      try {
        const newVoiceChannel = await guild.channels.create({
          name: `${user.username}'s ${config.voice.voicechannelSuffix}`,
          type: ChannelType.GuildVoice,
          parent: category.id,
          permissionOverwrites: [
            {
              id: guild.roles.everyone.id,
              deny: [PermissionFlagsBits.Connect],
            },
            {
              id: newState.member.id,
              allow: [PermissionFlagsBits.Connect],
            },
          ],
        });

        if (newVoiceChannel.type !== ChannelType.GuildVoice) {
          if (config.general.debugger) {
            console.log('The created channel is not a voice channel!');
          }
          return;
        }

        if (config.general.debugger) {
          console.log(`Created new voice channel: ${newVoiceChannel.name}`);
        }

        await newState.member.voice.setChannel(newVoiceChannel.id);
        if (config.general.debugger) {
          console.log(`${user.username} has been moved to ${newVoiceChannel.name}`);
        }

        userChannels.set(newVoiceChannel.id, { 
          creatorId: newState.member.id, 
          channel: newVoiceChannel, 
          coOwners: new Set(),
          permittedUsers: new Set(),
          ghostedUsers: new Set(),
        });

      } catch (error) {
        if (config.general.debugger) {
          console.error('Error creating voice channel or moving user:', error);
        }
      }
    }

    if (oldState.channelId && userChannels.has(oldState.channelId)) {
      const channelInfo = userChannels.get(oldState.channelId);

      if (channelInfo) {
        const voiceChannel = channelInfo.channel;

        if (voiceChannel.members.size === 0) {
          try {
            if (channelInfo.creatorId === oldState.member?.id) {
              await voiceChannel.delete();
              userChannels.delete(voiceChannel.id);
              if (config.general.debugger) {
                console.log(`The voice channel "${voiceChannel.name}" was deleted because it is empty.`);
              }
            }
          } catch (error) {
            if (config.general.debugger) {
              console.error(`Error deleting the voice channel "${voiceChannel.name}":`, error);
            }
          }
        }
      }
    }

    if (oldState.channelId && oldState.channelId !== newState.channelId) {
      const user = oldState.member?.user;
      const voiceChannel = oldState.guild.channels.cache.get(oldState.channelId) as VoiceChannel;

      if (user && voiceChannel) {
        const channelInfo = userChannels.get(voiceChannel.id);

        if (channelInfo) {
          const allOwnersLeft = ![channelInfo.creatorId, ...channelInfo.coOwners].some(id => voiceChannel.members.has(id));
          
          if (allOwnersLeft && voiceChannel.members.size === 0) {
            userChannels.delete(voiceChannel.id);
            console.log(`The owner and co-owners of the channel ${voiceChannel.name} have left, and it is now unclaimed.`);

            try {
              await voiceChannel.delete();
              if (config.general.debugger) {
                console.log(`The channel ${voiceChannel.name} has been deleted because it is empty and unclaimed.`);
              }
            } catch (error) {
              if (config.general.debugger) {
                console.error(`Error deleting the voice channel ${voiceChannel.name}:`, error);
              }
            }
          }
        }
      }
    }
  });
}
