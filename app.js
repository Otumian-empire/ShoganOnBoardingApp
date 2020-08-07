const express = require('express')
const onboardingController = require('./routes/onboardingroutes.js')

const app = express()

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static('./public'))

onboardingController(app)

app.listen(3000, function () {
    console.log('Server running on port 3000')
})
