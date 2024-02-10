const {Router} = require('express')

// controllers
// favorite controllers
const {
    allMyFavorites,
    addNewFavorite,
    deleteFavorite,
} = require('../controllers/favoritesControllers')

// private routes
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

// router
const router = Router()

// get favorites
router.get('/my-favorites',privateRoutes,allMyFavorites)

// add favorite
router.post('/add-favorite',privateRoutes,addNewFavorite)

// remove favorite
router.delete('/delete-favorite/:_id',privateRoutes,deleteFavorite)

// exports
module.exports = router