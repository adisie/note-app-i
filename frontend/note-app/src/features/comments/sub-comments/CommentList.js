// sub-comment
// SingleComment
import SingleComment from "./SingleComment"

// main
// CommentList
const CommentList = () => {
  return (
    <div className="flex-grow h-[90vh] mt-1 overflow-y-auto relative pr-1 mr-9 ml-1" id="comments-list-con">
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <SingleComment />
    </div>
  )
}

export default CommentList