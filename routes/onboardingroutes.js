module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send(req.url + " we are doing the just fine in the onboarding route")
    })

}
