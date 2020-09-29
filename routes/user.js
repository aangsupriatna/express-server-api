const router = require('express').Router()
const user = require('../controller/UserController')

router.get('/users', user.getUsers)
router.post('/user', user.postUser)

module.exports = router