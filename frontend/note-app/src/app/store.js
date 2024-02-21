import {configureStore} from '@reduxjs/toolkit'

// reducers
import filesReducer from '../features/files/filesSlice'

export const store = configureStore({
    reducer: {
        files: filesReducer,
    }
})