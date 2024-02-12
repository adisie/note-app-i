import {configureStore} from '@reduxjs/toolkit'

// reducers
// usersReducer
import usersReducer from '../features/users/usersSlice'
// homeReducer
import homeReducer from '../features/home/homeSlice'
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
// chatsReducer
import chatsReducer from '../features/chats/chatsSlice'
// connectionsReducer
import connectionsReducer from '../features/connections/connectionsSlice'

// store
export const store = configureStore({
    reducer: {
        users: usersReducer,
        home: homeReducer,
        profiles: profilesReducer,
        notes: notesReducer,
        comments: commentsReducer,
        favorites: favoritesReducer,
        likes: likesReducer,
        chats: chatsReducer,
        connections: connectionsReducer,
    }
})
