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

// socketio connection
io.on('connection',socket=>{
    // notes
    // new note
    socket.on('newNote',note=>{
        io.emit('newNoteEvent',note)
    })
    // delete note
    socket.on('deleteNote',_id=>{
        io.emit('deleteNoteEvent',_id)
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

// public files
app.use('/public',express.static('public'))


