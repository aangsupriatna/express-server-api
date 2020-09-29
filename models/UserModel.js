const knex = require('../knex')
const moment = require('moment')
const bcrypt = require('bcrypt')

const { Model } = require('objection')
Model.knex(knex)

class UserModel extends Model {
    static get tableName() {
        return 'users'
    }
}

module.exports = UserModel