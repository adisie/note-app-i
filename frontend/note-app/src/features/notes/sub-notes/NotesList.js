
// sub-notes
// SingleNote
import SingleNote from "./SingleNote"

// main
// NotesList
const NotesList = () => {
  return (
    <div className="flex-grow h-[90vh] overflow-y-auto mt-1" id="notes-list-con-id">
        <SingleNote />
        <SingleNote />
        <SingleNote />
        <SingleNote />
        <SingleNote />
        <SingleNote />
    </div>
  )
}

export default NotesList