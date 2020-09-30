const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')

module.exports = {
    signIn: async (req, res) => {
        const { username, password } = req.body
        await UserModel
            .query()
            .findOne({
                username: username
            }).then(async (user) => {
                // check password
                const checkPassword = bcrypt.compareSync(password, user.password)
                if (checkPassword) {
                    // generate jwt token
                    const token = await jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
                    if (token) {
                        res.cookie('token', token, {
                            secure: false,
                            httpOnly: true,
                        }).json({ message: 'User authenticated', token: token })
                    }
                } else {
                    res.status(401).json({ message: 'Wrong password' })
                }
            }).catch(error => {
                res.status(401).json({ message: 'User not found' })
            })
    },

    signUp: async (req, res) => {
        const { username, email, password } = req.body

        if (req.body.password != req.body.password2) {
            res.status(401).json({ message: 'Password not match' })
        }

        await UserModel.query()
            .insert({
                username: username,
                email: email,
                password: password,
                role: 'member'
            }).then(newuser => {
                res.status(200).json({ newuser, message: 'New user added' })
            }).catch(error => {
                if (error.nativeError.code == 'ER_DUP_ENTRY') res.status(400).json({ message: 'User already exist' })
                res.status(400).json({ message: 'Signup error' })
            })
    },

    signOut: async (req, res) => {
        if (!req.user) {
            res.status(400).json({ message: 'Token not found' })
        } else {
            const token = await jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: 0 })
            if (token) {
                res.cookie('token', token, {
                    secure: false,
                    httpOnly: true,
                }).json({ message: 'User deauthenticated', token: token })
            }
        }

    }
}