import {configureStore} from '@reduxjs/toolkit'

// reducers
// home reducer
import homeReducer from '../features/home/homeSlice'

export const store = configureStore({
    reducer: {
        home: homeReducer,
    }
})
