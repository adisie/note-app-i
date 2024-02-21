const {Router} = require('express')

// controllers
// files controllers
const {
    files,
    newFile,
    deleteFile,
} = require('../controllers/filesControllers')
// middlewares
const singleFileUpload = require('../middlewares/filesMiddlewares')

// router
const router = Router()

// get all files 
router.get('/files',files)

// add new file
router.post('/new-file',singleFileUpload.single('file'),newFile)

// delete file
router.delete('/delete-file/:_id',deleteFile)

// exports
module.exports = router