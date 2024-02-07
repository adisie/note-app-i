import {useSelector} from 'react-redux'

// actions from slices
// commentsSlice
import {
  selectIsComment,
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

  return (
    <div className="flex-grow w-[75%] flex flex-col relative">
      <NotesList />
      <NewNoteForm />
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