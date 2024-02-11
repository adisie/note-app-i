
// sub-likes
// LikeBtns
import LikeBtns from "./sub-likes/LikeBtns"

// main
// Likes
const Likes = ({noteId}) => {
  return (
    <div>
        <LikeBtns noteId={noteId}/>
    </div>
  )
}

export default Likes