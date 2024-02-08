const {Router} = require('express')

// controllers
// profilesControllers
const {
    allProfiles,
    newProfile,
    deleteProfile,
} = require('../controllers/profilesControllers')

// middelwares
// privateRoutes
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

// fileUpload
const {
    profileUpload,
} = require('../middlewares/fileUploadMiddleware') 

// router
const router = Router()

// all-profiles
router.get('/all-profiles',allProfiles)

// new-profile
router.post('/new-profile',privateRoutes,profileUpload.single('profile'),newProfile)

// delete-profile
router.delete('/delete-profile/:_id',privateRoutes,deleteProfile)

// exports
module.exports = router