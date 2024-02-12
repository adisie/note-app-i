import {createSlice} from '@reduxjs/toolkit'

// initialState
const initialState = {
    chatDir: 'FRL',
}
// chatsSlice
const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChatDir: (state,action) => {
            state.chatDir = action.payload
        }
    }
})

// actions
export const {
    setChatDir,
} = chatsSlice.actions

// selectors
// chatDir
export const selectChatDir = state => state.chats.chatDir 

export default chatsSlice.reducer