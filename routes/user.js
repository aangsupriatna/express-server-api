const router = require('express').Router()
const user = require('../controller/UserController')
const auth = require('../middleware/auth')

router.get('/', auth.isAuthorized, user.getUsers)
router.post('/', user.postUser)

module.exports = router