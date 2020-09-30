const jwt = require('jsonwebtoken')

module.exports = {
    signIn: async (req, res) => {
        const token = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.cookie('token', token, {
            secure: false,
            httpOnly: true,
        }).json({ message: 'User authenticated' })
    },

    signUp: async (req, res) => {
        const user = req.body
        res.status(200).json({ message: "Success", user: user })
    }
}