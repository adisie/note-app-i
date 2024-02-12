const {Router} = require('express')

// controllers
const {
    allConnections,
    newConnection,
    deleteConnection,
} = require('../controllers/connectionsControllers')

// middlewares
// privateRoutes
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

// router
const router = Router()

// all connections 
router.get('/all-connections',privateRoutes,allConnections)

// new connection
router.post('/new-connection',privateRoutes,newConnection)

// delete connection
router.delete('/delete-connection/:_id',privateRoutes,deleteConnection)

// exports
module.exports = router