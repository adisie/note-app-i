const {Router} = require('express')

// controllers
// notesControllers
const {
    allNotes,
    newNote,
    deleteNote,
} = require('../controllers/notesControllers')

// middlewares
// privateRoutes
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')
// fileUpload
const {
    fileUpload,
} = require('../middlewares/fileUploadMiddleware')

// router
const router = Router()

// all-notes
router.get('/all-notes',allNotes)

// new note 
router.post('/new-note',privateRoutes,fileUpload.single('file'),newNote)

// delete note
router.delete('/delete-note/:_id',privateRoutes,deleteNote)

// exports
module.exports = router