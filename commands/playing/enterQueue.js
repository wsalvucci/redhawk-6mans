const { Command } = require('discord.js-commando')
const enterQueue = require('./queueFunctions').enterQueue

module.exports = class EnterQueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'enterqueue',
            aliases: ['eq'],
            group: 'playing',
            memberName: 'enterqueue',
            description: 'Enters the queue if the user has not already joined'
        })
    }

    run(message) {
        enterQueue(message.author.id, message.author.username)
            .then(() => {
                message.reply('Added to queue')
            })
            .catch(err => {
                message.reply(err)
            })
    }
}