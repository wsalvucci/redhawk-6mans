const fetch = require('node-fetch')

exports.queue = []

// Return if user was successfully added to the queue, false if not
exports.enterQueue = (id) => {
    //Get user data from mongo atlas and add to queue
    return false
}

// Return true if the user is in the queue, false if not
exports.leaveQueue = (id) => {
    var queuePos = this.queue.findIndex((player) => player.id === id)
    if (queuePos !== -1) {
        this.queue.splice(queuePos, 1)
        return true
    }
    return false
}