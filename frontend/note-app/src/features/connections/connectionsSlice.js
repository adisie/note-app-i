import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// initialState
const initialState = {
    isConnectionId: null,
    isConnectionPending: false,
    isConnectionAccepting: false,
    isNotificationReading: false,
    connections: [],
    pendingConnections: [],
    requestedConnections: [],
    acceptedConnections: [],
    notifications: [],
}

// all pending connections
export const allPendingConnections = createAsyncThunk('connections/allPendingConnections',async () => {
    try{
        const response = await axios.get('/api/connections/all-pending-connections')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// all requested connections
export const allRequestedConnections = createAsyncThunk('connections/allRequestedConnections',async () => {
    try{
        const response = await axios.get('/api/connections/all-requested-connections')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// all accepted connections
export const allAcceptedConnections = createAsyncThunk('connections/allAcceptedConnections',async () => {
    try{
        const response = await axios.get('api/connections/all-accepted-connections')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// new connections
export const newConnection = createAsyncThunk('connections/newConnection', async data => {
    try{
        const response = await axios.post('/api/connections/new-connection',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// accept connection
export const acceptConnection = createAsyncThunk('connections/acceptConnection',async connectionId => {
    try{
        const response = await axios.put(`/api/connections/accept-connection/${connectionId}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// notifications
// all notifications
export const allNotifications = createAsyncThunk('connections/allNotifications',async () => {
    try{
        const response = await axios.get('/api/notifications/all-notifications')
        return response.data
    }catch(err){
        return err.response.data
    }
})

export const readAllNotifications = createAsyncThunk('connections/readAllNotifications', async () => {
    try{
        const response = await axios.put('/api/notifications/read-notifications') 
        return response.data
    }catch(err){
        return err.response.data
    }
})

// connectionsSlice
const connectionsSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {
        setIsConnectionId: (state,action) => {
            state.isConnectionId = action.payload
        },
        // new connection event
        newConnectionEvent: (state,action) => {
            console.log('new connection event')
            // let connections = [action.payload,...state.requestedConnections] 
            // let filteredConnections = [] 
            // connections.forEach(con => {
            //     let isConnectionExist = filteredConnections.find(fcon => fcon._id === con._id) 
            //     if(!isConnectionExist){
            //         filteredConnections.push(con)
            //     }
            // })
            // state.requestedConnections = filteredConnections
        },
        // new connection event
        newFriendRequestEvent: (state,action) => {
            console.log('new connection event')
            let connections = [action.payload,...state.requestedConnections] 
            let filteredConnections = [] 
            connections.forEach(con => {
                let isConnectionExist = filteredConnections.find(fcon => fcon._id === con._id) 
                if(!isConnectionExist){
                    filteredConnections.push(con)
                }
            })
            state.requestedConnections = filteredConnections
        },
        resetNotifications: state => {
            state.notifications = []
        },
        newNotificationEvent: (state,action) => {
            let notifications = [action.payload,...state.notifications]
            let filteredNotifications = [] 
            notifications.forEach(notification => {
                let isNotificationExist = filteredNotifications.find(fn => fn._id === notification._id) 
                if(!isNotificationExist){
                    filteredNotifications.push(notification)
                }
            })
            state.notifications = filteredNotifications
        },
        connectionRequestedAcceptedEvent: (state,action) => {
            let connections = [action.payload,...state.acceptedConnections]
            let filteredConnections = []
            connections.forEach(con => {
                let isConExist = filteredConnections.find(fcon => fcon._id === con._id) 
                if(!isConExist){
                    filteredConnections.push(con)
                }
            })

            state.acceptedConnections = filteredConnections 
        },
    },

    extraReducers: builder => {
        builder
            // cases
            // all pending connections
            // fulfilled
            .addCase(allPendingConnections.fulfilled,(state,action)=>{
                if(action.payload.pendingConnections){
                    state.pendingConnections = action.payload.pendingConnections
                }
            })
            // all requested connections
            // fulfilled
            .addCase(allRequestedConnections.fulfilled,(state,action)=>{
                if(action.payload.requestedConnections){
                    state.requestedConnections = action.payload.requestedConnections
                }
            })
            // all accepted connections
            // fulfilled
            .addCase(allAcceptedConnections.fulfilled,(state,action)=>{
                if(action.payload.acceptedConnections){
                    state.acceptedConnections = action.payload.acceptedConnections
                }
            })
            // new connection
            // pending
            .addCase(newConnection.pending, state => {
                state.isConnectionPending = true 
            })
            // fulfilled
            .addCase(newConnection.fulfilled,(state,action) => {
                state.isConnectionPending = false 
                state.isConnectionId = null
                console.log(action.payload)
                if(action.payload.connection){
                    SOCKET.emit('newConnection',action.payload.connection)
                    state.pendingConnections = [...state.pendingConnections,action.payload.connection]
                }
            })
            // rejected
            .addCase(newConnection.rejected, state => {
                state.isConnectionPending = false 
                state.isConnectionId = null
            })
            // accept connection
            // pending
            .addCase(acceptConnection.pending, state => {
                state.isConnectionAccepting = true 
            })
            // fulfilled
            .addCase(acceptConnection.fulfilled, (state,action)=>{
                state.isConnectionAccepting = false 
                state.isConnectionId = null 
                if(action.payload.acceptedConnection){
                    SOCKET.emit('acceptConnection',action.payload.acceptedConnection)
                    state.requestedConnections = state.requestedConnections.filter(con => con._id !== action.payload.acceptedConnection._id)
                    state.acceptedConnections = [action.payload.acceptedConnection,...state.acceptedConnections]
                }
            })
            // rejected
            .addCase(acceptConnection.rejected, state => {
                state.isConnectionAccepting = false 
                state.isConnectionId = null 
            })

            // notifications
            // all notifications
            // fulfilled
            .addCase(allNotifications.fulfilled,(state,action) => {
                if(action.payload.notifications){
                    state.notifications = action.payload.notifications
                }
            })
            // reading notifications
            // pending
            .addCase(readAllNotifications.pending,state => {
                state.isNotificationReading = true
            })
            // fulfilled
            .addCase(readAllNotifications.fulfilled,(state,action)=>{
                state.isNotificationReading = false 
                if(action.payload.message === 'all notification is read'){
                    let notifications = state.notifications.map(notification => ({...notification,isRead: true}))
                    state.notifications = notifications
                }
            })
            // rejected
            .addCase(readAllNotifications.rejected, state => {
                state.isNotificationReading = false
            })
    }
})

// actions
export const {
    setIsConnectionId,
    newConnectionEvent,
    newFriendRequestEvent,
    resetNotifications,
    newNotificationEvent,
    connectionRequestedAcceptedEvent,
} = connectionsSlice.actions

// selectors
// isConnectionId
export const selectIsConnectionId = state => state.connections.isConnectionId 
// isConnectionPending 
export const selectIsConnectionPending = state => state.connections.isConnectionPending
// isConnectionAccepting
export const selectIsConnectionAccepting = state => state.connections.isConnectionAccepting
// connections
export const selectConnections = state => state.connections.connections 
// accepted connections
export const selectAcceptedConnections = state => state.connections.acceptedConnections 
// pending connections
export const selectPendingConnections = state => state.connections.pendingConnections 
// requested connections
export const selectRequestedConnections = state => state.connections.requestedConnections 
// notifications
export const selectNotifications = state => state.connections.notifications 
// isNotification readng
export const selectIsNotificationReading = state => state.connections.isNotificationReading
// exports
export default connectionsSlice.reducer
