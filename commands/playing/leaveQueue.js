const { Command } = require('discord.js-commando')
const leaveQueue = require('./queue').leaveQueue

module.exports = class EnterQueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leavequeue',
            aliases: ['lq'],
            group: 'playing',
            memberName: 'leavequeue',
            description: 'Leaves the queue if the user has already joined'
        })
    }

    run(message) {
        if (leaveQueue(message.author.id)) {
            message.reply('Removed from queue')
        } else {
            message.reply('You aren\'t currently in the queue')
        }
    }
}