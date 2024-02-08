import {useSelector} from 'react-redux'

// actions from slices
// commentsSlice
import {
  selectIsComment,
  selectComments,
} from '../commentsSlice'

// sub-comment
// SingleComment
import SingleComment from "./SingleComment"

// main
// CommentList
const CommentList = () => {
  // states from slices
  // comments slice
  const isComment = useSelector(selectIsComment) 
  const comments = useSelector(selectComments)

  let noteComments = comments.find(comment=>comment._id === isComment)
  console.log()

  return (
    <div className="flex-grow h-[90vh] mt-1 overflow-y-auto relative pr-1 mr-9 ml-1" id="comments-list-con">
       {
        noteComments?.comments?.length > 0
        ?
        noteComments?.comments?.map(comment=>(
          <SingleComment key={comment._id} comment={comment}/>
        ))
        :
        <></>
       }
    </div>
  )
}

export default CommentList