import {useSelector} from 'react-redux'

// actions from slices
// notesSlice
import {
  selectNotes,
} from '../notesSlice'
// users
import {
  selectUsers,
  selectIsSearch,
} from '../../users/usersSlice'

// sub-notes
// SingleNote
import SingleNote from "./SingleNote"

// main
// NotesList
const NotesList = () => {
  // states from slices
  // notesSlice
  const notes = useSelector(selectNotes)
  // users
  const users = useSelector(selectUsers)
  const isSearch = useSelector(selectIsSearch) 

  let finalIds = users.filter(user => user.username.startsWith(isSearch)) 
  finalIds = finalIds.map(user => user._id)

  let finalNotes = notes.filter(note => finalIds.includes(note.authorId)) 

  return (
    <div className="flex-grow h-[90vh] overflow-y-auto mt-1" id="notes-list-con-id">
        {
          finalNotes.length > 0 && finalNotes.map(note=>(
            <SingleNote key={note._id} note={note}/>
          ))
        }
    </div>
  )
}

export default NotesList