const app = require('../expressModule')

app.get('/games/addGame', function(req, res) {
    db.collection('games').insertOne({
        orangeTeam: {
            player1: {
                name: req.query.orangePlayer1.name,
                startingRank: req.query.orangePlayer1.rank,
                endingRank: req.query.orangePlayer1.rank},
            player2: {
                name: req.query.orangePlayer2.name,
                startingRank: req.query.orangePlayer2.rank,
                endingRank: req.query.orangePlayer2.rank
            },
            player3: {
                name: req.query.orangePlayer3.name,
                startingRank: req.query.orangePlayer3.rank,
                endingRank: req.query.orangePlayer3.rank
            }
        },
        blueTeam: {
            player1: {
                name: req.query.bluePlayer1.name,
                startingRank: req.query.bluePlayer1.rank,
                endingRank: req.query.bluePlayer1.rank},
            player2: {
                name: req.query.bluePlayer2.name,
                startingRank: req.query.bluePlayer2.rank,
                endingRank: req.query.bluePlayer2.rank
            },
            player3: {
                name: req.query.bluePlayer3.name,
                startingRank: req.query.bluePlayer3.rank,
                endingRank: req.query.bluePlayer3.rank
            }
        },
        orangeScore: 0,
        blueScore: 0,
        winner: null
    })
        .then(item => {
            console.log(item)
            res.send(item)
        })
        .catch(err => {
            console.error(err)
            res.send({error: err})
        })
})