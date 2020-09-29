const userModel = require('../models/UserModel')

async function getUsers(req, res) {
    await userModel
        .query()
        .orderBy('id', 'ASC')
        .then(users => {
            res.status(200).json({ users })
        }).catch(error => {
            throw new Error(error)
        })
}

async function postUser(req, res) {
    const request = req.body
    res.status(200).json({ message: "Hello, postUser!", request })
}

module.exports = {
    getUsers,
    postUser
}