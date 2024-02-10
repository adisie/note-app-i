require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const socketio = require('socket.io')


const PORT = process.env.PORT || 5050
const app = express()
const server = http.createServer(app)

// configration settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000',],
    credentials: true,
}))

// db connections
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('CONNECTED')
    server.listen(PORT,()=>{
        console.log('LISTENING')
    })
})
.catch(err=>{
    console.log('db connection error')
    process.exit(-1)
})

// socketio
const io = socketio(server,{
    cors: {
        origin: ['http://localhost:3000',]
    }
})

let onlineUsers = []

// add new online user
const addNewOnlineUser = user => {
    let isUserExist = onlineUsers.find(onUser => onUser.userId === user.userId) 
    if(isUserExist){
        let index = onlineUsers.findIndex(onUser => onUser.userId === user.userId)
        onlineUsers[index] = user
    }else{
        onlineUsers.push(user)
    }
}

// remove user on logout
const removeUserOnLogout = userId => {
    onlineUsers = onlineUsers.filter(user => user.userId !== userId)
}

// remove user on disconnect
const removeUserOnDisconnect = sockectId => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== sockectId)
}

// socketio connection
io.on('connection',socket=>{
    // online users
    // on login
    socket.on('userLogin',user => {
        addNewOnlineUser({userId: user,socketId: socket.id})
        io.emit('onlineUsersEvent',onlineUsers)
    })

    // remove user on logout
    socket.on('userLogout',userId => {
        removeUserOnLogout(userId)
        io.emit('onlineUsersEvent',onlineUsers)
    })
    // remove user on disconnect
    socket.on('disconnect',() => {
        removeUserOnDisconnect(socket.id)
        io.emit('onlineUsersEvent',onlineUsers)
    })
    // emit online users
    io.emit('onlineUsersEvent',onlineUsers)
    // notes
    // new note
    socket.on('newNote',note=>{
        io.emit('newNoteEvent',note)
    })
    // delete note
    socket.on('deleteNote',_id=>{
        io.emit('deleteNoteEvent',_id)
    })

    // favorites
    // new favorite
    socket.on('newFavorite',favorite => {
        socket.emit('newFavoriteEvent',favorite)
    })
    // remove favorite
    socket.on('removeFavorite',favorite => {
        socket.emit('removeFavoriteEvent',favorite)
    })

    // comments
    // new comment
    socket.on('newComment',comment=>{
        io.emit('newCommentEvent',comment)
    })
    // delete comment
    socket.on('deleteComment',comment=>{
        io.emit('deleteCommentEvent',comment)
    })

    // new user signup
    socket.on('userSignup',user=>{
        io.emit('userSignupEvent',user)
    })

    // profiles
    // new profile
    socket.on('newProfile',profile => {
        io.emit('newProfileEvent',profile)
    })

    // delete profile
    socket.on('deleteProfile',profile => {
        io.emit('deleteProfileEvent',profile)
    })
})


// routes
// usersRoutes
app.use('/api/users',require('./routes/usersRoutes'))
// notesRoutes
app.use('/api/notes',require('./routes/notesRoutes'))
// commentsRoutes
app.use('/api/comments',require('./routes/commentsRoutes'))
// profilesRoutes
app.use('/api/profiles',require('./routes/profilesRoutes'))
// favoritesRoutes
app.use('/api/favorites',require('./routes/favoritesRoutes'))

// public files
app.use('/public',express.static('public'))


