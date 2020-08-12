const { onboardingDB: db } = require('../db/onboardingdb.js')
const router = require("express").Router()
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', (req, res) => {
    let { firstname, lastname, email, password } = req.body

    bcrypt.genSalt(parseInt(process.env.PWD_SALTROUNDS))
        .then(salt => {
            bcrypt.hash(password, salt, (hashErr, hash) => {
                if (hashErr) {
                    console.log(hashErr)
                    return res.status(500).json({
                        'status': false,
                        'message': 'Hash unsucessful'
                    })
                }

                db.insert(firstname, lastname, email, hash)
                    .then((result) => {
                        if (result.rowCount > 0) {
                            return res.status(201).json({
                                'status': true,
                                'message': 'Account created sucessfully'
                            })
                        }

                        return res.status(500).json({
                            'status': false,
                            'message': 'Account creation unsucessfully'
                        })
                    })
                    .catch(insertError => {
                        console.log(insertError)
                        return res.json({
                            'status': false,
                            'message': 'Account creation error'
                        })
                    })
            })
        })
        .catch(saltError => {
            console.log(saltError)
            return res.status(500).json({
                'status': false,
                'message': 'Salt error'
            })
        })
})

router.post('/login', (req, res) => {
    let { email, password } = req.body

    db.readOnePassword(email)
        .then(result => {
            if (result.rowCount > 0) {
                const hash = result.rows[0].password

                bcrypt.compare(password, hash, (compareErr, match) => {
                    if (compareErr) {
                        console.log(compareErr)
                        return res.status(403).json({
                            'status': false,
                            'message': 'Compare error'
                        })
                    }

                    if (match) {
                        return res.status(200).json({
                            'status': true,
                            'message': 'Login sucessful'
                        })
                    }

                    return res.status(403).json({
                        'status': false,
                        'message': 'Login unsucessful'
                    })

                })
            } else {
                console.log('Unknow user, please register')
                return res.status(403).json({
                    'status': false,
                    'message': 'Unknown user'
                })
            }
        })
        .catch(readingPasswordErr => {
            console.log(readingPasswordErr)
            return res.status(500).json({
                'status': false,
                'message': 'Reading password error'
            })
        })
})

router.get('/forgetpassword', (req, res) => {
    res.render('forgetpassword')
})

router.get('/resetpassword', (req, res) => {
    res.render('resetpassword')
})

router.get('/success', (req, res) => {
    res.render('./status/success')
})

router.get('/error', (req, res) => {
    res.render('./status/error')
})


module.exports = { onboardingRouter: router }
