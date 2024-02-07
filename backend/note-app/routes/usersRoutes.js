const {Router} = require('express')

// controllers
// usersControllers
const {
    signup,
    login,
    logout,
    checkAuth,
    allUsers,
} = require('../controllers/usersControllers')

// middlewares
// privateRoutes
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

const router = Router()

// signup
router.post('/signup',signup)

// login
router.post('/login',login)

// logout
router.get('/logout',logout)

// chec-auth
router.get('/check-auth',privateRoutes,checkAuth)

//all-users
router.get('/all-users',allUsers)

// exports
module.exports = router
