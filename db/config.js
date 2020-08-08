require('dotenv').config()

const { Client } = require('pg')

const client = new Client({
    user: process.env.PG_DBUSERNAME,
    host: process.env.PG_DBHOST,
    database: process.env.PG_DBNAME,
    password: process.env.PG_DBPASSWORD,
    port: process.env.PG_DBPORT || 3000,
})

client.connect()
    .then(result => {
        console.log(`DB connected ${result}`)
    })
    .catch(err => console.log("Connection error " + err.stack))

module.exports = { client }
