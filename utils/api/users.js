const app = require('../expressModule')

app.get('/users/addUser', function(req, res) {
    db.collection('users').findOne({discordId: req.query.discordId})
        .then(item => {
            if (item === null) {
                db.collection('users').insertOne({discordId: req.query.discordId, name: req.query.name, timeAdded: req.query.timeAdded, rank: 1500, gamesPlayed: 0, wins: 0, losses: 0})
                    .then(item => {
                        console.log(item)
                        res.send(item)
                    })
                    .catch(err => {
                        console.error(err)
                        res.send({error: err})
                    })
            } else {
                console.log("User already exists")
                res.send({error: err})
            }
        })
        .catch(err => {
            console.error(err)
            res.send({error: err})
        })
})

app.get('/users/getUser', function(req, res) {
    db.collection('users').findOne({discordId: req.query.discordId})
        .then(item => {
            if (item === null) {
                res.send({"error": "no user found"})
            } else {
                res.send(item)
            }
        })
        .catch(err => {
            console.error(err)
            res.send({error: "Error retrieving user from database"})
        })
})

app.get('/users/setRank', function(req, res) {
    db.collection('users').updateOne({discordId: req.query.discordId}, {$set: {rank: req.query.rank}})
        .then(item => {
            res.send(item)
        })
        .catch(err => {
            console.error(err)
            res.send({error: err})
        })
})