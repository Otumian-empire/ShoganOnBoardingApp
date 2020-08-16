const { client } = require('./config')


const onboardingDB = {
    readAllUsers: function (limit = 5, offset = 0) {
        let query = `SELECT id, firstname, lastname, email FROM onboarding ORDER BY id ASC LIMIT $1 OFFSET $2`
        return client.query(query, [limit, offset])
    },
    readOneUser: function (email) {
        let query = `SELECT id, firstname, lastname, email FROM onboarding WHERE email=$1`
        return client.query(query, [email])
    },
    readOnePasswordUser: function (email) {
        let query = `SELECT password FROM onboarding WHERE email=$1`
        return client.query(query, [email])
    },
    updateUser: {
        firstname: function (email, newfirstname) {
            let query = `UPDATE onboarding SET firstname=$1 WHERE email=$2`
            return client.query(query, [newfirstname, email])
        },
        lastname: function (email, newlastname) {
            let query = `UPDATE onboarding SET lastname=$1 WHERE email=$2`
            return client.query(query, [newlastname, email])
        },
        email: function (email, newemail) {
            const query = `UPDATE onboarding SET email=$1 WHERE email=$2`
            return client.query(query, [newemail, email])
        },
        password: function (email, newpassword) {
            let query = `UPDATE onboarding SET password=$1 WHERE email=$2`
            return client.query(query, [newpassword, email])
        }
    },
    createUser: function (params) {
        let query = `INSERT INTO onboarding(firstname, lastname, email, password) VALUES($1, $2, $3, $4)`
        return client.query(query, params)
    },
    deleteUser: function (email) {
        let query = `DELETE FROM onboarding WHERE email=$1`
        return client.query(query, [email])
    },
    createCode: function (params) {
        const query = `INSERT INTO forgetpassword(email, code) VALUES($1, $2)`
        return client.query(query, params)
    },
    readCode: function (email) {
        const query = `SELECT code FROM forgetpassword WHERE email=$1`
        return client.query(query, [email])
    },
    updateCode: function (params) {
        const query = `UPDATE forgetpassword SET code=$2 WHERE email=$1`
        return client.query(query, params)
    },
    deleteCode: function (email) {
        const query = `DELETE FROM forgetpassword WHERE email=$1`
        return client.query(query, [email])
    },
}


module.exports = { onboardingDB }
