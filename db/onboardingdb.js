const { client } = require('./config')
const { hashPassword } = require('./encrypt.js')

const onboardingDB = {
    readAll: function (limit = 5, offset = 0) {
        let query = 'SELECT id, firstname, lastname, email FROM onboarding ORDER BY id ASC LIMIT $1 offset $2'
        return client.query(query, [limit, offset])
    },
    readOne: function (id) {
        let query = 'SELECT id, firstname, lastname, email, password FROM onboarding WHERE onboarding.id=$1'
        return client.query(query, [id])
    },
    update: {
        firstname: function (id, newfirstname) {
            let query = "UPDATE onboarding set firstname:$1 WHERE id=$2"
            return client.query(query, [newfirstname, id])
        },
        lastname: function (id, newlastname) {
            let query = "UPDATE onboarding set lastname:$1 WHERE id=$2"
            return client.query(query, [newlastname, id])
        },
        email: function (id, newemail) {
            return client.query("UPDATE onboarding set email:$1 WHERE id=$2", [newemail, id])
        },
        password: function (id, newpassword) {
            let newpasswordhash = hashPassword(newpassword)
            let query = "UPDATE onboarding set password:$1 WHERE id=$2"
            return client.query(query, [newpasswordhash, id])
        }
    },
    insert: function (firstname, lastname, email, password) {
        let passwordhash = hashPassword(password)
        let query = "INSERT INTO onboarding(firstname, lastname, email, password) VALUES($1, $2, $3, $4)"
        return client.query(query, [firstname, lastname, email, passwordhash])
    },
    delete: function (id) {
        let query = "DELETE FROM onboarding WHERE id=$1"
        return client.query(query, [id])
    }
}

module.exports = { onboardingDB }
