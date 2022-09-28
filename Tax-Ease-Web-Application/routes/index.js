const express = require('express')
const router = express.Router()
const { addUser, getUsers, findUser } = require('../controllers/user')


router
    .route('/')
    .post(addUser)
    .get(getUsers)


router
    .route('/:id')
    .get(findUser)


module.exports = router