const bcrypt = require('bcrypt')
const userModel = require('../models/UserModel')

module.exports = {
    // display all users
    get: async (req, res) => {
        await userModel
            .query()
            .orderBy('id', 'ASC')
            .then(users => {
                return res.status(200).json({ users })
            }).catch(error => {
                return res.status(401).json({ message: "Get users error" })
            })
    },
    // store new user
    store: async (req, res) => {
        const { username, email, password, password2 } = req.body

        if (password != password2) {
            return res.status(401).json({ message: 'Password not match' })
        }

        await userModel.query()
            .insert({
                username: username,
                email: email,
                password: password,
                role: 'member'
            }).then(newuser => {
                return res.status(200).json({ newuser, message: 'New user added' })
            }).catch(error => {
                return res.status(400).json({ message: 'Signup error' })
            })
    },
    // display one user
    show: async (req, res) => {
        const id = req.params.id

        await userModel.query()
            .findById(id)
            .then(user => {
                return res.status(200).json(user)
            }).catch(error => {
                return res.status(400).json({ message: 'Getting user error' })
            })
    },
    // update user
    update: async (req, res) => {
        const { username, email, password, password2, role } = req.body
        const id = req.params.id

        if (password && password != password2) {
            return res.status(400).json({ message: 'Password not match' })
        }

        await userModel.query()
            .findById(id)
            .patch({
                username: username,
                email: email,
                password: password,
                role: role
            })
            .then(user => {
                return res.status(200).json(user)
            }).catch(error => {
                return res.status(400).json({ message: 'Update user error' })
            })
    },
    // delete user
    destroy: async (req, res) => {
        const id = req.params.id

        await userModel.query()
            .deleteById(id)
            .then(user => {
                return res.status(200).json(user)
            }).catch(error => {
                return res.status(400).json({ message: 'Delete user error' })
            })
    }
}