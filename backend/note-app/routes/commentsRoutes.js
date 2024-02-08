const {Router} = require('express')

// controlers
// commentsControllers
const {
    allComments,
    newComment,
    deleteComment,
} = require('../controllers/commentsControllers')

// middlewares
// privateRoutes
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

// router
const router = Router()

// all-comments
router.get('/all-comments',allComments) 

// new-comment
router.post('/new-comment',privateRoutes,newComment)

// delete-comment
router.delete('/delete-comment/:_id',privateRoutes,deleteComment)

// exports
module.exports = router