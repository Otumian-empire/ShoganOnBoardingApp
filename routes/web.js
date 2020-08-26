const router = require("express").Router()


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/forgetpassword', (req, res) => {
    res.render('forgetpassword')
})

router.get('/resetpassword', (req, res) => {
    res.render('resetpassword')
})

router.get('/success', (req, res) => {
    res.render('./status/success', { 'message': req.query.message })
})

router.get('/error', (req, res) => {
    res.render('./status/error', { 'message': req.query.message })
})


module.exports = { web: router }
