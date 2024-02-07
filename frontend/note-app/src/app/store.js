import {configureStore} from '@reduxjs/toolkit'

// reducers
// usersReducer
import usersReducer from '../features/users/usersSlice'
// commentsReducer
import commentsReducer from '../features/comments/commentsSlice'

// store
export const store = configureStore({
    reducer: {
        users: usersReducer,
        comments: commentsReducer,
    }
})
