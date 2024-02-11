const {Router} = require('express')

// controllers
// likesControllers
const {
    allLikes,
    addNewLike,
    deleteLike,
} = require('../controllers/likesControllers')

// utils
// privateRoutes
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

// router
const router = Router()

// get all likes
router.get('/all-likes',allLikes)

// add new like
router.post('/new-like',privateRoutes,addNewLike)

// delete like
router.delete('/delete-like/:note_id',privateRoutes,deleteLike)

// exports
module.exports = router