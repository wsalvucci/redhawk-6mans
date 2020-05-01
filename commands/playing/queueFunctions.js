const fetch = require('node-fetch')
const moment = require('moment')
var queue = require('./queueData')
var matchManager = require('../../utils/matchManager')

const getUser = (id) => {
    return new Promise(function(resolve, reject) {
        var params = {
            discordId: id
        }
        var url = new URL(process.env.API_ENDPOINT + '/users/getUser')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                if (json.error === undefined) {
                    resolve(json)
                } else {
                    resolve(null)
                }
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

const addNewUser = (id, name) => {
    return new Promise(function(resolve, reject) {
        var params = {
            discordId: id,
            name: name,
            timeAdded: moment().unix()
        }
        var url = new URL(process.env.API_ENDPOINT + '/users/addUser')
        url.search = new URLSearchParams(params).toString()
        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.error !== undefined) {
                    reject(json.error)
                } else {
                    resolve(json.ops[0])
                }
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

// Resolve if user was successfully added to the queue, reject if not
exports.enterQueue = (id, name) => {
    //Get user data from mongo atlas and add to queue
    return new Promise(function(resolve, reject) {
        var queuePos = queue.findIndex((player) => player.discordId === id)
        if (queuePos !== -1) {
            reject('You are already in the queue')
        } else {
            getUser(id).then(data => {
                if (data === null) {
                    addNewUser(id, name).then(playerData => {
                        queue.push({'discordId': playerData.discordId, 'username': playerData.name, 'rank': playerData.rank})
                        matchManager()
                    })
                    .catch(err => {
                        reject('There was an error adding you to the queue')
                    })
                } else {
                    queue.push({'discordId': data.discordId, 'username': data.name, 'rank': data.rank})
                }
            })
            .then(() => {
                matchManager()
                resolve(true)
            })
            .catch(err => {
                reject('There was an error adding you to the queue')
            })
        }
    })
}

// Return true if the user is in the queue, false if not
exports.leaveQueue = (id) => {
    var queuePos = queue.findIndex((player) => player.discordId === id)
    if (queuePos !== -1) {
        queue.splice(queuePos, 1)
        return true
    }
    return false
}

exports.viewQueue = () => {
    return queue
}