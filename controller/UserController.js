const userModel = require('../models/UserModel')

module.exports = {
    get: async (req, res) => {
        await userModel
            .query()
            .orderBy('id', 'ASC')
            .then(users => {
                res.status(200).json({ users })
            }).catch(error => {
                res.status(401).json({ message: "Get users error" })
            })
    },

    store: async (req, res) => {
        const request = req.body
        res.status(200).json({ message: `Hello, ${req.user.role}!`, user: req.user })
    },

    show: async (req, res) => {
        const request = req.body
        res.status(200).json({ message: `Hello, ${req.user.role}!`, user: req.user })
    },

    update: async (req, res) => {
        const request = req.body
        res.status(200).json({ message: `Hello, ${req.user.role}!`, user: req.user })
    },

    destroy: async (req, res) => {
        const request = req.body
        res.status(200).json({ message: `Hello, ${req.user.role}!`, user: req.user })
    }
}