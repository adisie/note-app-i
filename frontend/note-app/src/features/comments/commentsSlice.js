import {createSlice} from '@reduxjs/toolkit'

// initialState
const initialState = {
    isComment: null,
}

// commentsSlice
const commmentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setIsComment: (state,action) => {
            state.isComment = action.payload 
        },
    },
    extraReducers: builder => {

    }
})

// actions
export const {
    setIsComment,
} = commmentsSlice.actions

// selectors
// isComment
export const selectIsComment = state => state.comments.isComment 

export default  commmentsSlice.reducer