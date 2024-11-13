import { Client } from 'discord.js';
import config from '../config';

export function setBotStatus(client: Client) {
  client.user?.setPresence({
    activities: [
      {
        name: config.general.activityName,
        type: config.general.activityType,
      },
    ],
    status: 'online',
  });
  if (config.general.debugger == true) {
    console.log(`Bot status set to type: ${config.general.activityType}`);
  }
}
