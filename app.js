const express = require('express')
const { onboardingRouter } = require("./routes/onboardingroutes.js")

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use("/", onboardingRouter)

app.listen(port, function () {
    console.log(`Server running on port ${port}`)
})
