# Discord Bot Templates

Production-ready Discord bot templates for both Python (discord.py) and JavaScript (discord.js) with Docker support and CI/CD integration.

## Overview

This repository contains two complete Discord bot templates:

- **discord-py/** - Python template using discord.py
- **discord-js/** - JavaScript template using discord.js

Both templates include:
- Modern bot implementation with slash commands
- Prefix commands support
- Docker containerization
- GitHub Actions CI/CD workflows
- Security best practices
- Comprehensive documentation

## Quick Start

Choose your preferred language and navigate to its directory:

### Python (discord.py)
```bash
cd discord-py
```

### JavaScript (discord.js)
```bash
cd discord-js
```

Each directory contains its own README with detailed setup instructions.

## Features

### Both Templates Include

- **Modern Discord API Implementation**
  - Slash commands (Application Commands)
  - Traditional prefix commands
  - Event handling
  - Error handling

- **Docker Support**
  - Production-ready Dockerfiles
  - Multi-architecture builds (amd64/arm64)
  - Non-root user execution
  - Health checks
  - Optimized layer caching

- **CI/CD Pipeline**
  - Automated Docker image builds
  - GitHub Container Registry (ghcr.io) publishing
  - Git SHA tagging
  - Latest tag (optional)
  - Multi-platform builds

- **Security**
  - Environment variable configuration
  - Non-root container execution
  - .env.example templates
  - Proper .gitignore/.dockerignore

- **Developer Experience**
  - Comprehensive documentation
  - Example commands
  - Logging and debugging
  - Local development support

## Template Comparison

| Feature | discord.py | discord.js |
|---------|-----------|------------|
| **Language** | Python 3.11+ | Node.js 18+ |
| **Library Version** | discord.py 2.4.0 | discord.js 14.16.3 |
| **Base Image** | python:3.11-slim | node:20-alpine |
| **Image Size** | ~200MB | ~150MB |
| **Startup Time** | Fast | Very Fast |
| **Memory Usage** | Low | Very Low |
| **Learning Curve** | Easy | Easy |

## Getting Started

### Prerequisites

Choose one based on your preferred language:

**For Python:**
- Python 3.11 or higher
- pip

**For JavaScript:**
- Node.js 18 or higher
- npm

**For Docker deployment (both):**
- Docker
- Docker Compose (optional)

**For all:**
- Discord Bot Token from [Discord Developer Portal](https://discord.com/developers/applications)

### Creating a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give your bot a name
4. Go to the "Bot" tab
5. Click "Add Bot"
6. Copy your bot token (keep it secret!)
7. Enable necessary Privileged Gateway Intents:
   - Presence Intent (optional)
   - Server Members Intent
   - Message Content Intent
8. Go to "OAuth2" → "URL Generator"
9. Select scopes: `bot` and `applications.commands`
10. Select permissions based on your needs
11. Copy the generated URL and invite your bot to a server

## CI/CD Setup

The repository includes GitHub Actions workflows for automated Docker image builds.

### Enabling CI/CD

1. Fork or clone this repository
2. Go to repository Settings → Actions → General
3. Under "Workflow permissions", select "Read and write permissions"
4. Enable "Allow GitHub Actions to create and approve pull requests"
5. Push changes to the main branch

### How It Works

When you push changes to the main branch:

1. GitHub Actions detects changes in `discord-py/` or `discord-js/`
2. Builds the appropriate Docker image
3. Tags the image with:
   - Git SHA (e.g., `ghcr.io/username/repo/discord-bot-py:abc1234`)
   - `latest` tag
4. Pushes to GitHub Container Registry
5. Creates a summary with pull commands

### Using Published Images

After the workflow runs, pull the images:

```bash
# Python bot
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO/discord-bot-py:latest

# JavaScript bot
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO/discord-bot-js:latest
```

Run with:

```bash
docker run -e DISCORD_TOKEN=your_token ghcr.io/YOUR_USERNAME/YOUR_REPO/discord-bot-py:latest
```

## Project Structure

```
.
├── discord-py/                 # Python template
│   ├── bot.py                 # Main bot code
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile            # Docker configuration
│   ├── .dockerignore         # Docker ignore rules
│   ├── .env.example          # Environment template
│   └── README.md             # Python-specific docs
│
├── discord-js/                # JavaScript template
│   ├── index.js              # Main bot code
│   ├── package.json          # Node.js dependencies
│   ├── Dockerfile            # Docker configuration
│   ├── .dockerignore         # Docker ignore rules
│   ├── .env.example          # Environment template
│   └── README.md             # JavaScript-specific docs
│
├── .github/
│   └── workflows/
│       ├── docker-build-py.yml   # Python CI/CD
│       └── docker-build-js.yml   # JavaScript CI/CD
│
├── .gitignore                # Git ignore rules
├── LICENSE                   # GPL-3.0 License
└── README.md                 # This file
```

## Deployment Options

### 1. Local Development
Run directly on your machine for development and testing.

### 2. Docker
Deploy using Docker for consistency across environments.

### 3. Docker Compose
Use docker-compose for easier management:

```yaml
version: '3.8'
services:
  bot:
    image: ghcr.io/username/repo/discord-bot-py:latest
    env_file: .env
    restart: unless-stopped
```

### 4. Cloud Platforms
Deploy to:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Railway
- Render
- Fly.io

### 5. Kubernetes
Deploy using Kubernetes for scaling and high availability.

## Environment Variables

Both templates use environment variables for configuration:

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Bot token from Discord Developer Portal | Yes |
| `CLIENT_ID` | Application ID (discord.js only, for slash commands) | Yes (JS) |

## Security Best Practices

1. **Never commit tokens or secrets**
   - Use `.env` files (already in .gitignore)
   - Use environment variables in production
   - Rotate tokens if exposed

2. **Run containers as non-root**
   - Both Dockerfiles use non-root users
   - Reduces attack surface

3. **Keep dependencies updated**
   - Regularly update packages
   - Monitor security advisories
   - Use Dependabot (included)

4. **Use least privilege principle**
   - Only request necessary Discord permissions
   - Only enable required intents

5. **Validate user input**
   - Sanitize commands
   - Implement rate limiting
   - Validate arguments

## Troubleshooting

### Bot not starting
- Check if `DISCORD_TOKEN` is set correctly
- Verify token in Discord Developer Portal
- Check console logs for errors

### Slash commands not appearing
- Ensure bot has `applications.commands` scope
- Wait up to 1 hour for global commands to sync
- Try re-inviting the bot
- For discord.js, ensure `CLIENT_ID` is set

### Docker build fails
- Check Docker is running
- Verify Dockerfile syntax
- Ensure you're in the correct directory
- Check for sufficient disk space

### CI/CD not working
- Verify workflow permissions in repository settings
- Check GitHub Actions logs
- Ensure GITHUB_TOKEN has package write permissions

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Resources

### Discord.py
- [Documentation](https://discordpy.readthedocs.io/)
- [GitHub](https://github.com/Rapptz/discord.py)
- [Discord Server](https://discord.gg/dpy)

### Discord.js
- [Documentation](https://discord.js.org/)
- [Guide](https://discordjs.guide/)
- [GitHub](https://github.com/discordjs/discord.js)
- [Discord Server](https://discord.gg/djs)

### Docker
- [Documentation](https://docs.docker.com/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### GitHub Actions
- [Documentation](https://docs.github.com/en/actions)
- [Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Support

If you find these templates helpful, please consider:
- Starring the repository
- Sharing with others
- Contributing improvements
- Reporting issues

## Acknowledgments

Built with:
- [discord.py](https://github.com/Rapptz/discord.py) by Rapptz
- [discord.js](https://github.com/discordjs/discord.js) by the Discord.js team
- Docker
- GitHub Actions

---

**Happy bot building!** 🤖
