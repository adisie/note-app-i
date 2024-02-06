// sub-notes
// NotesList
import NotesList from "./sub-notes/NotesList"
// NewNoteForm
import NewNoteForm from "./sub-notes/NewNoteForm"

// main
// Posts
const Notes = () => {
  return (
    <div className="flex-grow flex flex-col">
      <NotesList />
      <NewNoteForm />
    </div>
  )
}

export default Notes