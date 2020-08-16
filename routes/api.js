const { onboardingDB: db } = require('../db/onboardingdb.js')
const router = require("express").Router()
const bcrypt = require('bcrypt')
const validation = require('../validation/validation.js')


router.post('/signup', [
    validation.validateParams(['firstname', 'lastname', 'email', 'password']),
    validation.validateResult], (req, res) => {
        let { firstname, lastname, email, password } = req.body

        bcrypt.hash(password, 12, (err, hash) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    'status': false,
                    'message': 'Hash unsucessful'
                })
            }

            db.insert(firstname, lastname, email, hash)
                .then(() => {
                    return res.status(201).json({
                        'status': true,
                        'message': 'Account created sucessfully'
                    })
                })
                .catch(insertError => {
                    console.log(insertError)
                    return res.status(500).json({
                        'status': false,
                        'message': 'Account creation unsucessfully'
                    })
                })
        })
    })


router.post('/login', [
    validation.validateParams(['email', 'password']),
    validation.validateResult], (req, res) => {
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
                                'message': 'Incorrect email or password'
                            })
                        }

                        if (match)
                            return res.status(200).json({
                                'status': true,
                                'message': 'Login sucessful'
                            })

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


router.post('/forgetpassword', [
    validation.validateParams(['email']),
    validation.validateResult], (req, res) => {
        // get email and validate it
        // check if email exist in users table
        // generate code and insert into forgetpassword table
        // email code to user
    })


router.put('/resetpassword', [
    validation.validateParams(['email', 'password', 'code']),
    validation.validateResult], (req, res) => {
        // get email and validate it
        // check if email is in forgetpassword Table
        
    })



module.exports = { api: router }
