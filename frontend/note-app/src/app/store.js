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
// favoritesReducer
import favoritesReducer from '../features/favorites/favoritesSlice'
// likesReducer
import likesReducer from '../features/likes/likesSlice'

// store
export const store = configureStore({
    reducer: {
        users: usersReducer,
        profiles: profilesReducer,
        notes: notesReducer,
        comments: commentsReducer,
        favorites: favoritesReducer,
        likes: likesReducer,
    }
})
