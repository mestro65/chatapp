const router = require('express').Router()
const { catchErrors } = require('../handlers/errorHandlers.js')
const chatroomController = require('../controllers/userControllers.js')


const auth = require('../middlewares/auth')

router.post('/', auth, catchErrors(chatroomController.createChatroom))


module.exports = router