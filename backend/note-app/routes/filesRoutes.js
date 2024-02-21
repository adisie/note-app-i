const {Router} = require('express')

// models
const File = require('../models/filesModel')

// middlewares
const fileUpload = require('../middlewares/filesMiddleware')

// controllers
const {
    getAllFiles,
    addNewFiles,
    deleteFiles,
} = require('../controllers/filesControllers')

// router
const router = Router()

// files
router.get('/files',getAllFiles)

// new files
router.post('/new-files',fileUpload.array('files'),addNewFiles)

// delete files
router.delete('/delete-files/:_id',deleteFiles)

// exports
module.exports = router