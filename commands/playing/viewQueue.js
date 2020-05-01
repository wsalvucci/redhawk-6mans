const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const viewQueue = require('./queueFunctions').viewQueue

module.exports = class ViewQueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'viewqueue',
            aliases: ['vq', 'queue'],
            group: 'playing',
            memberName: 'viewqueue',
            description: 'Displays the current memebers in the queue'
        })
    }

    run(message) {
        var queue = ''
        const queueData = viewQueue()
        for(var i = 0; i < queueData.length; i++) {
            var player = queueData[i]
            queue += player.username + ' - ' + player.rank + '\n'
        }
        const embedResponse = new Discord.RichEmbed()
            .setColor('#FF0000')
            .setTitle('Queue')
            .setAuthor('Redhawk 6mans')
            .setDescription(queue)
        message.channel.send(embedResponse)
    }
}