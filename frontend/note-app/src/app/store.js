import {configureStore} from '@reduxjs/toolkit'

// reducers
// usersReducer
import usersReducer from '../features/users/usersSlice'
// profilesReducer
import profilesReducer from '../features/profiles/profilesSlice'
// notesReducer
import notesReducer from '../features/notes/notesSlice'
// commentsReducer
import commentsReducer from '../features/comments/commentsSlice'

// store
export const store = configureStore({
    reducer: {
        users: usersReducer,
        profiles: profilesReducer,
        notes: notesReducer,
        comments: commentsReducer,
    }
})
