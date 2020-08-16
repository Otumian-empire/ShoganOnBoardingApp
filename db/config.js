require('dotenv').config()

const { Client } = require('pg')

const client = new Client({})

client.connect()
    .then(() => {
        console.log(`DB connected`)
    })
    .catch(err => console.log(`Connection error ${err.stack}`))

module.exports = { client }
