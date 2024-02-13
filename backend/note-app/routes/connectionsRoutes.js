const {Router} = require('express')

// controllers
const {
    allConnections,
    pendingConnections,
    requestedConnections,
    acceptConnection,
    allAcceptedConnections,
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

// pending connections
router.get('/all-pending-connections',privateRoutes,pendingConnections)

// requested connections
router.get('/all-requested-connections',privateRoutes,requestedConnections)

// accept connection
router.put('/accept-connection/:_id',privateRoutes,acceptConnection)

// all accepted connections
router.get('/all-accepted-connections',privateRoutes,allAcceptedConnections)

// new connection
router.post('/new-connection',privateRoutes,newConnection)

// delete connection
router.delete('/delete-connection/:_id',privateRoutes,deleteConnection)

// exports
module.exports = router