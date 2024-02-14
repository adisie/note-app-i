import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// initialState
const initialState = {
    chatDir: 'FRL',
    messages: [],
    isChatSelected: null,
    isMessagePending: false,
    isMessageDeleting: false,
    isMessageId: null,
}
// all messgae
export const allMessages = createAsyncThunk('chats/allMessages',async () => {
    try{
        const response = await axios.get('/api/messages/all-messages')
        return response.data
    }catch(err){
        return err.response.data
    }
})
// new message
export const newMessage = createAsyncThunk('chats/newMessage',async data => {
    try{
        const response = await axios.post('/api/messages/new-message',data) 
        return response.data
    }catch(err){
        return err.response.data
    }
})

// delete message
export const deleteMessage = createAsyncThunk('chats/deleteMessage',async _id => {
    try{
        const response = await axios.delete(`/api/messages/delete-message/${_id}`) 
        return response.data
    }catch(err){
        return err.response.data
    }
})

// chatsSlice
const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChatDir: (state,action) => {
            state.chatDir = action.payload
        },
        setIsChatSelected: (state,action) => {
            state.isChatSelected = action.payload
        },
        setIsMessageId: (state,action) => {
            state.isMessageId = action.payload
        },
        newMessageEvent: (state,action) => {
            let messages = [...state.messages,action.payload] 
            let filteredMessages = [] 
            messages.forEach(message => {
                let isMessageExist = filteredMessages.find(ms => ms._id === message._id) 
                if(!isMessageExist){
                    filteredMessages.push(message)
                }
            })
            state.messages = filteredMessages
        },
        deleteMessageEvent: (state,action) => {
            state.messages = state.messages.filter(message => message._id !== action.payload._id)
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // all messages
            // fulfilled
            .addCase(allMessages.fulfilled, (state,action) => {
                if(action.payload.messages){
                    state.messages = action.payload.messages
                }
            })
            // new message
            // pending
            .addCase(newMessage.pending, state => {
                state.isMessagePending = true
            })
            // fulfilled
            .addCase(newMessage.fulfilled,(state,action)=>{
                state.isMessagePending = false 
                if(action.payload.newMessage){
                    SOCKET.emit('newMessage',action.payload.newMessage)
                }
            })
            // rejected
            .addCase(newMessage.rejected,state => {
                state.isMessagePending = false
            })
            // delete message
            // pending
            .addCase(deleteMessage.pending, state => {
                state.isMessageDeleting = true 
            })
            // fulfilled
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.isMessageDeleting = false
                state.isMessageId = null
                if(action.payload.message){
                    SOCKET.emit('deleteMessage',action.payload.message)
                }
            })
            // rejected
            .addCase(deleteMessage.rejected, state => {
                state.isMessageDeleting = false 
                state.isMessageId = null
            })
    }
})

// actions
export const {
    setChatDir,
    setIsChatSelected,
    setIsMessageId,
    newMessageEvent,
    deleteMessageEvent,
} = chatsSlice.actions

// selectors
// chatDir
export const selectChatDir = state => state.chats.chatDir 
// isChatSelected
export const selectIsChatSelected = state => state.chats.isChatSelected 
// isMessagePending
export const selectIsMessagePending = state => state.chats.isMessagePending
// messages 
export const selectMessages = state => state.chats.messages
// isMessageDeleting
export const selectIsMessageDeleting = state => state.chats.isMessageDeleting 
// isMessageId
export const selectIsMessageId = state => state.chats.isMessageId 

export default chatsSlice.reducer