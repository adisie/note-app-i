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
    connections: [],
}

// all connections
export const allConnections = createAsyncThunk('connections/all-connections',async () => {
    try{
        const response = await axios.get('/api/connections/all-connections')
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
            let connections = [...state.connections,action.payload] 
            let filteredConnections = [] 
            connections.forEach(con => {
                let isConnectionExist = filteredConnections.find(fcon => fcon._id === con._id) 
                if(!isConnectionExist){
                    filteredConnections.push(con)
                }
            })
            state.connections = filteredConnections
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // all connections
            // fulfilled
            .addCase(allConnections.fulfilled,(state,action)=>{
                if(action.payload.connections){
                    state.connections = action.payload.connections
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
                }
            })
            // rejected
            .addCase(newConnection.rejected, state => {
                state.isConnectionPending = false 
                state.isConnectionId = null
            })
    }
})

// actions
export const {
    setIsConnectionId,
    newConnectionEvent,
} = connectionsSlice.actions

// selectors
// isConnectionId
export const selectIsConnectionId = state => state.connections.isConnectionId 
// isConnectionPending 
export const selectIsConnectionPending = state => state.connections.isConnectionPending
// connections
export const selectConnections = state => state.connections.connections 
// exports
export default connectionsSlice.reducer
