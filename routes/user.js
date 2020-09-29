const router = require('express').Router()
const user = require('../controller/UserController')

router.get('/user', user.getUser)
router.post('/user', user.postUser)

module.exports = router