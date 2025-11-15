# Discord.py Bot Template

A production-ready Discord bot template using discord.py with Docker support and CI/CD integration.

## Features

- Modern discord.py implementation with slash commands
- Both prefix commands and slash commands support
- Proper error handling and logging
- Docker support with multi-stage builds
- CI/CD pipeline for GitHub Container Registry
- Non-root user for security
- Health checks

## Prerequisites

- Python 3.11+ (for local development)
- Docker (for containerized deployment)
- Discord Bot Token from [Discord Developer Portal](https://discord.com/developers/applications)

## Quick Start

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Add your Discord token to `.env`:
   ```
   DISCORD_TOKEN=your_token_here
   ```

5. Run the bot:
   ```bash
   python bot.py
   ```

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t discord-bot-py .
   ```

2. Run the container:
   ```bash
   docker run -e DISCORD_TOKEN=your_token_here discord-bot-py
   ```

   Or with an env file:
   ```bash
   docker run --env-file .env discord-bot-py
   ```

## Available Commands

### Prefix Commands (!)
- `!ping` - Check bot latency
- `!hello` - Get a greeting from the bot
- `!help` - Show all available commands

### Slash Commands (/)
- `/info` - Get bot information and statistics

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your Discord bot token | Yes |

## Docker Image

The Docker image is built with:
- Python 3.11 slim base
- Non-root user for security
- Health checks
- Optimized layer caching

### Pull from GitHub Container Registry

```bash
docker pull ghcr.io/your-username/discord-bot-py:latest
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
discord-py/
├── bot.py              # Main bot code
├── requirements.txt    # Python dependencies
├── Dockerfile         # Docker configuration
├── .dockerignore      # Docker ignore rules
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Customization

### Adding New Commands

#### Prefix Command
```python
@bot.command(name='mycommand', help='Description')
async def mycommand(ctx):
    await ctx.send('Response')
```

#### Slash Command
```python
@bot.tree.command(name='myslash', description='Description')
async def myslash(interaction: discord.Interaction):
    await interaction.response.send_message('Response')
```

### Adding Cogs

For larger bots, consider organizing commands into cogs:

```python
from discord.ext import commands

class MyCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def mycommand(self, ctx):
        await ctx.send('Response')

async def setup(bot):
    await bot.add_cog(MyCog(bot))
```

## Security Notes

- Never commit your `.env` file or expose your bot token
- The Docker image runs as a non-root user
- Use environment variables for sensitive configuration
- Regularly update dependencies for security patches

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Support

For issues and questions:
- Discord.py Documentation: https://discordpy.readthedocs.io/
- Discord.py Discord Server: https://discord.gg/dpy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
