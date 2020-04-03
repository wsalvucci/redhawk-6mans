const { Command } = require('discord.js-commando')
const enterQueue = require('./queue').enterQueue

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
        if (enterQueue(message.author.id)) {
            message.reply('Added to queue')
        } else {
            message.reply('There was an error adding you to the queue')
        }
    }
}