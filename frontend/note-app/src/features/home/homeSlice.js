import {createSlice} from '@reduxjs/toolkit'

// initialState
const initialState = {
    mainDir: 'NOTES',
}

// homeSlice
const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setMainDir: (state,action) => {
            state.mainDir = action.payload
        }
    },
})

// actions
export const {
    setMainDir,
} = homeSlice.actions

// selectors
// mainDir
export const selectMainDir = state => state.home.mainDir 

export default homeSlice.reducer
