import discord
from discord.ext import commands
import os
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('discord_bot')

# Bot configuration
intents = discord.Intents.default()
intents.message_content = True
intents.members = True

bot = commands.Bot(command_prefix='!', intents=intents)


@bot.event
async def on_ready():
    """Event handler for when the bot is ready."""
    logger.info(f'{bot.user} has connected to Discord!')
    logger.info(f'Bot is in {len(bot.guilds)} guilds')

    # Sync slash commands
    try:
        synced = await bot.tree.sync()
        logger.info(f'Synced {len(synced)} command(s)')
    except Exception as e:
        logger.error(f'Failed to sync commands: {e}')


@bot.event
async def on_message(message):
    """Event handler for messages."""
    # Ignore messages from the bot itself
    if message.author == bot.user:
        return

    # Process commands
    await bot.process_commands(message)


@bot.command(name='ping', help='Check bot latency')
async def ping(ctx):
    """Responds with the bot's latency."""
    latency = round(bot.latency * 1000)
    await ctx.send(f'Pong! Latency: {latency}ms')


@bot.command(name='hello', help='Say hello to the bot')
async def hello(ctx):
    """Responds with a greeting."""
    await ctx.send(f'Hello {ctx.author.mention}! 👋')


@bot.tree.command(name='info', description='Get bot information')
async def info(interaction: discord.Interaction):
    """Slash command to get bot information."""
    embed = discord.Embed(
        title='Bot Information',
        description='A Discord bot template',
        color=discord.Color.blue()
    )
    embed.add_field(name='Guilds', value=str(len(bot.guilds)), inline=True)
    embed.add_field(name='Users', value=str(len(bot.users)), inline=True)
    embed.add_field(name='Latency', value=f'{round(bot.latency * 1000)}ms', inline=True)

    await interaction.response.send_message(embed=embed)


@bot.event
async def on_command_error(ctx, error):
    """Global error handler for commands."""
    if isinstance(error, commands.CommandNotFound):
        await ctx.send('Command not found. Use `!help` to see available commands.')
    elif isinstance(error, commands.MissingRequiredArgument):
        await ctx.send(f'Missing required argument: {error.param}')
    elif isinstance(error, commands.MissingPermissions):
        await ctx.send('You do not have permission to use this command.')
    else:
        logger.error(f'Unhandled error: {error}', exc_info=error)
        await ctx.send('An error occurred while processing the command.')


def main():
    """Main entry point for the bot."""
    token = os.getenv('DISCORD_TOKEN')

    if not token:
        logger.error('DISCORD_TOKEN environment variable not set!')
        raise ValueError('DISCORD_TOKEN environment variable is required')

    try:
        bot.run(token)
    except discord.LoginFailure:
        logger.error('Invalid token provided')
        raise
    except Exception as e:
        logger.error(f'Failed to start bot: {e}')
        raise


if __name__ == '__main__':
    main()
