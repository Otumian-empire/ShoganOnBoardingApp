const bcrypt = require('bcrypt')
const saltRounds = process.env.PWD_SALTROUNDS || 12

const hashPassword = function (plainPassword) {
    const salt = bcrypt.genSaltSync(parseInt(saltRounds));
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash
}

const checkHash = function (plainPassword, hash) {
    bcrypt.compare(plainPassword, hash)
        .then(result => result)
        .catch(err => {
            console.log(err.stack)
            return false
        })
}

module.exports = { hashPassword, checkHash }
