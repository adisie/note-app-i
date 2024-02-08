import {useSelector} from 'react-redux'

// actions from slices
// notesSlice
import {
  selectNotes,
} from '../notesSlice'

// sub-notes
// SingleNote
import SingleNote from "./SingleNote"

// main
// NotesList
const NotesList = () => {
  // states from slices
  // notesSlice
  const notes = useSelector(selectNotes)

  return (
    <div className="flex-grow h-[90vh] overflow-y-auto mt-1" id="notes-list-con-id">
        {
          notes.length > 0 && notes.map(note=>(
            <SingleNote key={note._id} note={note}/>
          ))
        }
    </div>
  )
}

export default NotesList