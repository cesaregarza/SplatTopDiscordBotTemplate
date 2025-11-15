# Discord.js Bot Template

A production-ready Discord bot template using discord.js v14 with Docker support and CI/CD integration.

## Features

- Modern discord.js v14 implementation
- Both prefix commands and slash commands support
- Proper error handling and logging
- Docker support with Alpine Linux
- CI/CD pipeline for GitHub Container Registry
- Non-root user for security
- Health checks
- Graceful shutdown handling

## Prerequisites

- Node.js 18+ (for local development)
- Docker (for containerized deployment)
- Discord Bot Token from [Discord Developer Portal](https://discord.com/developers/applications)

## Quick Start

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Add your Discord credentials to `.env`:
   ```
   DISCORD_TOKEN=your_token_here
   CLIENT_ID=your_client_id_here
   ```

5. Run the bot:
   ```bash
   npm start
   ```

   For development with auto-reload (Node 18+):
   ```bash
   npm run dev
   ```

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t discord-bot-js .
   ```

2. Run the container:
   ```bash
   docker run -e DISCORD_TOKEN=your_token_here -e CLIENT_ID=your_client_id_here discord-bot-js
   ```

   Or with an env file:
   ```bash
   docker run --env-file .env discord-bot-js
   ```

## Available Commands

### Prefix Commands (!)
- `!ping` - Check bot latency
- `!hello` - Get a greeting from the bot
- `!help` - Show all available commands

### Slash Commands (/)
- `/info` - Get bot information and statistics
- `/ping` - Check bot latency

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your Discord bot token | Yes |
| `CLIENT_ID` | Your Discord application/client ID | Yes (for slash commands) |

### Getting Your Credentials

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application (or create a new one)
3. **Bot Token**: Go to "Bot" tab → Click "Reset Token" → Copy the token
4. **Client ID**: Go to "OAuth2" tab → Copy the "Client ID"

## Docker Image

The Docker image is built with:
- Node.js 20 Alpine Linux (minimal size)
- Non-root user for security
- Health checks
- Production-optimized dependencies
- Optimized layer caching

### Pull from GitHub Container Registry

```bash
docker pull ghcr.io/your-username/discord-bot-js:latest
```

## CI/CD

This template includes GitHub Actions workflow that:
- Builds Docker images on push to main
- Tags images with git SHA and 'latest'
- Pushes to GitHub Container Registry (ghcr.io)

To enable CI/CD:
1. Go to repository Settings → Actions → General
2. Enable "Read and write permissions" for GITHUB_TOKEN

## Project Structure

```
discord-js/
├── index.js           # Main bot code
├── package.json       # Node.js dependencies
├── Dockerfile        # Docker configuration
├── .dockerignore     # Docker ignore rules
├── .env.example      # Environment variables template
└── README.md         # This file
```

## Customization

### Adding New Prefix Commands

Edit the `MessageCreate` event handler:

```javascript
case 'mycommand':
    await message.reply('Response');
    break;
```

### Adding New Slash Commands

1. Add command definition to the `commands` array:
```javascript
{
    name: 'mycommand',
    description: 'My command description',
}
```

2. Add handler in the `InteractionCreate` event:
```javascript
case 'mycommand':
    await interaction.reply('Response');
    break;
```

### Organizing Commands

For larger bots, consider organizing commands into separate files:

```javascript
// commands/ping.js
module.exports = {
    data: {
        name: 'ping',
        description: 'Check bot latency',
    },
    async execute(interaction) {
        await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
    },
};
```

## Bot Permissions

When inviting your bot, make sure to enable these permissions:
- Read Messages/View Channels
- Send Messages
- Embed Links
- Use Slash Commands

### Invite URL
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=274877975552&scope=bot%20applications.commands
```

Replace `YOUR_CLIENT_ID` with your actual client ID.

## Troubleshooting

### Slash commands not appearing
1. Ensure `CLIENT_ID` is set correctly in `.env`
2. Wait up to 1 hour for global commands to sync
3. Check console for registration errors
4. Try kicking and re-inviting the bot

### Bot not responding
1. Verify `DISCORD_TOKEN` is correct
2. Check bot has necessary permissions in the server
3. Ensure `Message Content Intent` is enabled in Discord Developer Portal
4. Check console for errors

## Security Notes

- Never commit your `.env` file or expose your bot token
- The Docker image runs as a non-root user
- Use environment variables for sensitive configuration
- Regularly update dependencies for security patches
- Enable 2FA on your Discord account

## Performance Tips

- Use ephemeral messages when appropriate (`ephemeral: true`)
- Implement command cooldowns for resource-intensive operations
- Use event filtering to reduce unnecessary processing
- Consider using a database for persistent storage

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Support

For issues and questions:
- Discord.js Documentation: https://discord.js.org/
- Discord.js Guide: https://discordjs.guide/
- Discord.js Discord Server: https://discord.gg/djs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
