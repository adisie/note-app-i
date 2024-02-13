import {createSlice} from '@reduxjs/toolkit'

// initialState
const initialState = {
    chatDir: 'FRL',
    isChatSelected: null,
}
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
    }
})

// actions
export const {
    setChatDir,
    setIsChatSelected,
} = chatsSlice.actions

// selectors
// chatDir
export const selectChatDir = state => state.chats.chatDir 
// isChatSelected
export const selectIsChatSelected = state => state.chats.isChatSelected 

export default chatsSlice.reducer