const express = require('express')
const { api } = require("./routes/api.js")
const { web } = require("./routes/web.js")

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
    
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use("/api", api)
app.use("/web", web)


app.get('/', (req, res) => {
    res.render('index') 
})


app.listen(port, function () {
    console.log(`Server running on port ${port}`)
})
