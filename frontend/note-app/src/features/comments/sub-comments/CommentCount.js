import {useSelector} from 'react-redux'

// actions from slices
// commentsSlice
import {
    selectComments,
} from '../commentsSlice'

// main
// CommentCount
const CommentCount = ({noteId}) => {
    // states from slices
    // commentsSlice
    const comments = useSelector(selectComments)
    let noteComments = comments.find(comment=>comment._id === noteId) 
  return (
    <>{noteComments?.comments?.length}</>
  )
}

export default CommentCount