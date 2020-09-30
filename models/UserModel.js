const knex = require('../knex')
const moment = require('moment')
const bcrypt = require('bcrypt')

const { Model } = require('objection')
Model.knex(knex)

class UserModel extends Model {
    static get tableName() {
        return 'users'
    }

    $beforeInsert() {
        this.password = bcrypt.hashSync(this.password, 10)
    }

    $beforeUpdate() {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, 10)
        }
        this.updated_at = moment().format()
    }
}

module.exports = UserModel