const MongoClient = require('mongodb').MongoClient
const app = require('./expressModule')

const url = 'mongodb+srv://thelounge_app_2020:' + process.env.DATABASE_PASSWORD + '@loungebotcluster-7wuhd.mongodb.net/test?retryWrites=true&w=majority&authSource=admin'

MongoClient.connect(url, function(err, client) {
    if (err) throw err

    db = client.db(process.env.DATABSE_NAME)
})