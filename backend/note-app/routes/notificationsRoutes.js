const {Router} = require('express')

// controllers
const {
    allNotifications,
    newNotification,
    deleteNotification,
    readAllNotifications,
} = require('../controllers/notificationsControllers')

// middlewares
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

// router
const router = Router()

// all my notifications
router.get('/all-notifications',privateRoutes,allNotifications)

// new incoming notifications
router.post('/new-notification',newNotification)

// read notificatons
router.put('/read-notifications',privateRoutes,readAllNotifications)

// delete notifications
router.delete('/delete-notification/:_id',deleteNotification)

// exports
module.exports = router