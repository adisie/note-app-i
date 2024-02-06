import {createSlice} from '@reduxjs/toolkit'

// initialState
const initialState = {
    usersFlag: 'LOGIN',
}

// usersSlice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersFlag: (state,action) => {
            state.usersFlag = action.payload
        },
    },
    extraReducers: builder => {

    }
})

// actions
export const {
    setUsersFlag,
} = usersSlice.actions

// selectors
// usersFlag
export const selectUsersFlag = state => state.users.usersFlag 

export default usersSlice.reducer