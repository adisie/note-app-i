import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'

// global constants
import {
  SOCKET,
} from '../../config'

// actions from slices
// notesSlice
import {
  allNotes,
  newNoteEvent,
  deleteNoteEvent,
} from './notesSlice'
// usersSlice
import {
  selectUser,
} from '../users/usersSlice'
// commentsSlice
import {
  selectIsComment,
  newCommentEvent,
  deleteCommentEvent,
} from '../comments/commentsSlice'

// sub-notes
// NotesList
import NotesList from "./sub-notes/NotesList"
// NewNoteForm
import NewNoteForm from "./sub-notes/NewNoteForm"

// comments
// Comments
import Comments from "../comments/Comments"

// main
// Posts
const Notes = () => {
  // states from slices
  // commentsSlice
  const isComment = useSelector(selectIsComment)
  // usersSlice
  const user = useSelector(selectUser)

  // hooks
  const dispatch = useDispatch()

  // effects
  // all notes
  useEffect(()=>{
    dispatch(allNotes())
  },[])

  // new note
  useEffect(()=>{
    SOCKET.on('newNoteEvent',note=>{
      dispatch(newNoteEvent(note))
    })
  },[])

  // delete note
  useEffect(()=>{
    SOCKET.on('deleteNoteEvent',_id=>{
      dispatch(deleteNoteEvent(_id))
    })
  },[])

  // new comments
  useEffect(()=>{
    SOCKET.on('newCommentEvent',comment=>{
      dispatch(newCommentEvent(comment))
    })
  },[])

  // delete comment
  useEffect(()=>{
    SOCKET.on('deleteCommentEvent',comment=>{
      dispatch(deleteCommentEvent(comment))
    })
  },[])

  return (
    <div className="flex-grow w-[75%] flex flex-col relative">
      <NotesList />
      {
        user && <NewNoteForm />
      }
      {
        isComment 
        ?
        <Comments /> 
        :
        <></>
      }
    </div>
  )
}

export default Notes