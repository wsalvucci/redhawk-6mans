const { RichEmbed } = require('discord.js')

function getTeamRank(teamArray) {
    var rank = 0
    teamArray.forEach(player => {
        rank += player.rank
    });
    return rank
}

module.exports = () => {
    var client = require('../bot')
    var queue = require('../commands/playing/queueData')

    const REQ_NUMBER_PLAYERS = parseInt(process.env.REQ_NUMBER_PLAYERS)

    const guild = client.guilds.get(process.env.GUILD_ID)
    const matchCategory = guild.channels.get(process.env.MATCH_VOICE_CATEGORY_ID)
    const announcementChannel = guild.channels.get(process.env.ANNOUNCEMENT_CHANNEL)
    const matchChannelOptions = {
        type: 'voice',
        userLimit: 3,
        parent: matchCategory
    }

    if (queue.length >= REQ_NUMBER_PLAYERS) {
        var lobbyPlayers = []
        while (queue.length > 0 && lobbyPlayers < REQ_NUMBER_PLAYERS) {
            lobbyPlayers.push(queue.shift())
        }
        if (lobbyPlayers.length === REQ_NUMBER_PLAYERS) {
            var orangePlayers = []
            var bluePlayers = []
            while (lobbyPlayers.length > 0) {
                if (getTeamRank(orangePlayers) <= getTeamRank(bluePlayers)) {
                    var newOrange = lobbyPlayers.shift()
                    orangePlayers.push(newOrange)
                } else {
                    var newBlue = lobbyPlayers.shift()
                    bluePlayers.push(newBlue)
                }
            }
            var queueChannelMembers = guild.channels.get(process.env.QUEUE_VOICE_ID).members
            var matchId = Math.floor(Math.random() * 10000)

            //Creates the voice channel
            Promise.all([
                guild.createChannel('orange_' + matchId, matchChannelOptions),
                guild.createChannel('blue_' + matchId, matchChannelOptions)
            ]).then(values => {

                const messageEmbed = new RichEmbed()
                    .setColor('#FF0000')
                    .setTitle('Match Created! Match ID: ' + matchId)
                    .setAuthor('Redhawk 6mans')
                    .addField('Orange Players', 'Ranks')
                
                orangePlayers.forEach(p => {
                    messageEmbed.addField(p.username, p.rank, true)
                });

                messageEmbed.addField('Blue Players', 'Ranks')

                bluePlayers.forEach(p => {
                    messageEmbed.addField(p.name, p.rank, true)
                });
                
                announcementChannel.send(messageEmbed)

                setTimeout(() => {
                    
                    //Moves players into the channels
                    queueChannelMembers.forEach(member => {
                        var orangePlayer = orangePlayers.find((player) => {
                            return member.id === player.discordId
                        })
                        var bluePlayer = bluePlayers.find((player) => {
                            return member.id === player.discordId
                        })
                        if (orangePlayer) {
                            member.setVoiceChannel(values[0].id)
                        }
                        if (bluePlayer) {
                            member.setVoiceChannel(values[1].id)
                        }
                    });
                    
                    //Checks every 10 seconds to see if there are still people in the channel. Deletes if empty
                    var orangeChannelCheck = setInterval(() => {
                        if (values[0].members.size === 0) {
                            values[0].delete('Empty match channel for 10 seconds').catch(err => console.error(err))
                            clearInterval(orangeChannelCheck)
                        }
                    }, 10000)

                    var blueChannelCheck = setInterval(() => {
                        if (values[1].members.size === 0) {
                            values[1].delete('Empty match channel for 10 seconds').catch(err => console.error(err))
                            clearInterval(blueChannelCheck)
                        }
                    }, 10000)

                }, 15000) //Time given before players are automoved into their respective channels
            })
        }
    }
}