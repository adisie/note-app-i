const {Router} = require('express')

// controllers
const {
    allMessages,
    newMessage,
    deleteMessage,
} = require('../controllers/messagesControllers')

// middlewares
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

// router
const router = Router()

// all messages
router.get('/all-messages',privateRoutes,allMessages)

// new message
router.post('/new-message',privateRoutes,newMessage)

// delete message
router.delete('/delete-message/:_id',privateRoutes,deleteMessage)

// exports
module.exports = router