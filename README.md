# Discord Voice Channel Bot

This Discord bot allows users to create and manage their own voice channels, offering a wide range of customization options. The bot provides functionality for channel owners to control access, rename channels, set user limits, manage permissions, and even "ghost" users for privacy.

## Features

- **Create & Manage Voice Channels:** Create and own your own voice channels and manage them with ease.
- **Permissions Management:** Assign and manage co-owners, allow or reject users, and control who can join your voice channel.
- **Channel Customization:** Rename your voice channel, set user limits, make the channel public or private, and more.
- **User Management:** Disconnect or ghost users, transfer ownership, and control access to the channel for different members.

## Slash Commands

### **General Commands**
- **/voice-permit**  
  Allow a user to join your private voice channel.
  
- **/voice-adminpermit**  
  Allow a user to join any specified voice channel (requires admin permission).
  
- **/voice-rename**  
  Rename your voice channel to a new name.

- **/voice-public**  
  Make your voice channel public for everyone to join.

- **/voice-private**  
  Make your voice channel private, restricted only to permitted users.

- **/voice-limit**  
  Set a maximum user limit for your voice channel.

- **/voice-unlimit**  
  Remove the user limit from your voice channel, making it unlimited.

- **/voice-transfer**  
  Transfer ownership of your voice channel to another user.

- **/voice-claim**  
  Claim ownership of a voice channel that you are in.

- **/voice-reject**  
  Reject a user from joining your voice channel.

- **/voice-disconnect**  
  Disconnect a user from the voice channel.

- **/voice-addowner**  
  Add a new co-owner to your voice channel.

- **/voice-removeowner**  
  Remove a co-owner from your voice channel.

- **/voice-unghost**  
  Unghost a user, restoring their visibility in the voice channel.

- **/voice-ghost**  
  Ghost a user, making them invisible to others in the voice channel.

- **/voice-ghostall**  
  Ghost all users in your voice channel except for the owner and co-owners.

- **/voice-unghostall**  
  Unghost all users in your voice channel, making it visible to everyone.

## Setup & Installation

1. **Invite the Bot:** First, you need to invite the bot to your Discord server by following the invite link.
2. **Configure Permissions:** Make sure the bot has proper permissions to manage voice channels and interact with your server members.
3. **Use Commands:** Start using the commands in your server's channels! You can type `/` followed by the command name (e.g., `/voice-permit`, `/voice-rename`, etc.) to invoke the bot's features.

## Example Usage

- **/voice-permit [user]**  
  Allows the specified user to join your private voice channel.

- **/voice-rename [new_name]**  
  Renames your voice channel to the name you specify.

- **/voice-ghost [user]**  
  Ghosts the specified user, making them invisible to others in the channel.

- **/voice-limit [number]**  
  Sets a limit on how many users can join your voice channel. A value of `0` means no limit.

## Permissions & Roles

The bot uses Discord's permission system to control who can use specific features:

- **Creator & Co-Owners:** The creator and co-owners of a voice channel have full permissions to modify the channel, add/remove users, and manage settings like limits and visibility.
- **Administrators:** Admins can manage other aspects of the bot’s functionality, such as permitting users to join any voice channel, even those that they do not own.

## Support

If you encounter any issues, have suggestions, or need help setting up the bot, feel free to reach out to me or join my discord server!
Link: https://discord.gg/cNx2f3vUVw
