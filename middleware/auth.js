const jwt = require('jsonwebtoken')

module.exports = {
    isAuth: async (req, res, next) => {
        const token = req.cookies.token || ''
        try {
            if (!token) {
                return res.status(401).json({ message: 'You need to login first' })
            }
            var decoded = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({
                message: 'Token is invalid'
            })
        }
    },

    isAuthorized: (req, res, next) => {
        try {
            if (req.user.role == 'admin') next()
        } catch (error) {
            res.status(401).json({
                message: 'User not Authorized'
            })
        }
    }
}
