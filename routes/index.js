const router = require('express').Router()
const { signIn, signUp } = require('../controller/AuthController')
const user = require('./user')
const auth = require('../middleware/auth')

router.post('/signin', signIn)
router.post('/signup', signUp)
router.use('/users', auth.isAuth, user)

module.exports = router