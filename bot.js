const Commando = require('discord.js-commando')

const client = new Commando.CommandoClient({
    commandPrefix: '?',
    owner: '194232193025966080'
})

const path = require('path')

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['playing', 'Commands relating to queuing, playing, and reporting scores'],
        ['account', 'Commands related to viewing account data']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('Miami RL');
});

client.login(process.env.BOT_TOKEN)

module.exports = client