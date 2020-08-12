const { client } = require('./config')


const onboardingDB = {
    readAll: function (limit = 5, offset = 0) {
        let query = `SELECT id, firstname, lastname, email FROM onboarding ORDER BY id ASC LIMIT $1 offset $2`
        return client.query(query, [limit, offset])
    },
    readOne: function (id) {
        let query = `SELECT id, firstname, lastname, email FROM onboarding WHERE id=$1`
        return client.query(query, [id])
    },
    readOnePassword: function (email) {
        let query = `SELECT password FROM onboarding WHERE email=$1`
        return client.query(query, [email])
    },
    update: {
        firstname: function (id, newfirstname) {
            let query = `UPDATE onboarding set firstname:$1 WHERE id=$2`
            return client.query(query, [newfirstname, id])
        },
        lastname: function (id, newlastname) {
            let query = `UPDATE onboarding set lastname:$1 WHERE id=$2`
            return client.query(query, [newlastname, id])
        },
        email: function (id, newemail) {
            return client.query(`UPDATE onboarding set email:$1 WHERE id=$2`, [newemail, id])
        },
        password: function (id, newpassword) {
            let query = `UPDATE onboarding set password:$1 WHERE id=$2`
            return client.query(query, [newpassword, id])
        }
    },
    insert: function (firstname, lastname, email, password) {
        let query = `INSERT INTO onboarding(firstname, lastname, email, password) VALUES($1, $2, $3, $4)`
        return client.query(query, [firstname, lastname, email, password])
    },
    delete: function (id) {
        let query = `DELETE FROM onboarding WHERE id=$1`
        return client.query(query, [id])
    }
}


module.exports = { onboardingDB }
