const { Client, GatewayIntentBits, Events, EmbedBuilder, REST, Routes } = require('discord.js');
require('dotenv').config();

// Create client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// Configuration
const PREFIX = '!';
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

// Validate environment variables
if (!TOKEN) {
    console.error('ERROR: DISCORD_TOKEN environment variable not set!');
    process.exit(1);
}

// Slash commands definition
const commands = [
    {
        name: 'info',
        description: 'Get bot information',
    },
    {
        name: 'ping',
        description: 'Check bot latency',
    },
];

// Register slash commands
async function registerCommands() {
    if (!CLIENT_ID) {
        console.warn('WARNING: CLIENT_ID not set. Slash commands will not be registered.');
        return;
    }

    try {
        console.log('Started refreshing application (/) commands.');
        const rest = new REST({ version: '10' }).setToken(TOKEN);

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
}

// Event: Bot is ready
client.once(Events.ClientReady, async (c) => {
    console.log(`✓ Logged in as ${c.user.tag}`);
    console.log(`✓ Bot is in ${c.guilds.cache.size} guilds`);

    // Register slash commands
    await registerCommands();
});

// Event: Message received (for prefix commands)
client.on(Events.MessageCreate, async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;

    // Check for prefix
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Prefix commands
    switch (command) {
        case 'ping':
            await message.reply(`Pong! Latency: ${Math.round(client.ws.ping)}ms`);
            break;

        case 'hello':
            await message.reply(`Hello ${message.author}! 👋`);
            break;

        case 'help':
            const helpEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Bot Commands')
                .setDescription('Available commands:')
                .addFields(
                    { name: `${PREFIX}ping`, value: 'Check bot latency', inline: true },
                    { name: `${PREFIX}hello`, value: 'Get a greeting', inline: true },
                    { name: `${PREFIX}help`, value: 'Show this message', inline: true },
                    { name: '/info', value: 'Get bot information (slash command)', inline: true },
                    { name: '/ping', value: 'Check latency (slash command)', inline: true },
                )
                .setTimestamp();

            await message.reply({ embeds: [helpEmbed] });
            break;

        default:
            await message.reply('Unknown command. Use `!help` to see available commands.');
    }
});

// Event: Slash command interaction
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    try {
        switch (commandName) {
            case 'ping':
                await interaction.reply(`Pong! Latency: ${Math.round(client.ws.ping)}ms`);
                break;

            case 'info':
                const infoEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Bot Information')
                    .setDescription('A Discord bot template')
                    .addFields(
                        { name: 'Guilds', value: `${client.guilds.cache.size}`, inline: true },
                        { name: 'Users', value: `${client.users.cache.size}`, inline: true },
                        { name: 'Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true },
                    )
                    .setTimestamp();

                await interaction.reply({ embeds: [infoEmbed] });
                break;

            default:
                await interaction.reply({ content: 'Unknown command!', ephemeral: true });
        }
    } catch (error) {
        console.error('Error handling interaction:', error);

        const errorMessage = { content: 'There was an error executing this command!', ephemeral: true };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
});

// Event: Error handling
client.on(Events.Error, (error) => {
    console.error('Discord client error:', error);
});

// Event: Warning
client.on(Events.Warn, (warning) => {
    console.warn('Discord client warning:', warning);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

// Unhandled rejection handler
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(TOKEN).catch((error) => {
    console.error('Failed to login:', error);
    process.exit(1);
});
