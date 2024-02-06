import {configureStore} from '@reduxjs/toolkit'

// reducers
// usersReducer
import usersReducer from '../features/users/usersSlice'

// store
export const store = configureStore({
    reducer: {
        users: usersReducer,
    }
})
