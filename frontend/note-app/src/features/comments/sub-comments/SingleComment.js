import {NavLink} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import { useSelector,useDispatch } from 'react-redux'

// actions from slices
// usersSlice
import {
  selectUser,
} from '../../users/usersSlice'
// commentsSlice
import {
  deleteComment,
  selectIsCommentDeleting,
} from '../commentsSlice'

// icons
// delete 
import { MdDeleteOutline } from "react-icons/md"

// sub-users
// GetUsername
import GetUsername from '../../users/sub-users/GetUsername'
// IsOnline
import IsOnline from '../../users/sub-users/IsOnline'
// sub-profiles
// GetProfile
import GetProfile from '../../profiles/sub-profiles/GetProfile'

// main
// SingleComment
const SingleComment = ({comment}) => {
  // states from slices
  // usersSlice
  const user = useSelector(selectUser)
  // commentsSlice
  const isCommentDeleting = useSelector(selectIsCommentDeleting)

  // hooks
  const dispatch = useDispatch()

  return (
    <div className="mb-3 py-1 text-xs text-emerald-900 font-serif border-b border-emerald-700 border-opacity-[.13] ml-3">
        <div className="ml-5 max-w-[450px]">
            <p className="text-justify">
                {comment.comment}
            </p>
        </div>
        {/* author-profile and username */}
        <div className="flex items-center my-1">
          {/* profile and name */}
            <NavLink className="flex items-center mr-1">
              <GetProfile userId={comment.authorId}/>
              <span className="mx-1">
                <GetUsername userId={comment.authorId}/>
              </span>
            </NavLink>
            {/* IsOnline */}
            <IsOnline userId={comment.authorId}/>

            <div className="flex items-center ml-2">
              {
                user?._id === comment.authorId 
                ?
                <>
                {
                  isCommentDeleting 
                  ?
                  <div className='mr-1 w-[12px] h-[12px] rounded-full border-2 border-emerald-700 border-r-transparent animate-spin'></div>
                  :
                  <button className="text-xl mx-1 opacity-[.75]" 
                    onClick={()=>{
                      dispatch(deleteComment(comment._id))
                    }}
                  >
                    <MdDeleteOutline />
                  </button>
                }
                </>
                :
                <></>
              }
              <span className='ml-1'>{formatDistanceToNow(new Date(comment.createdAt),{addSuffix: true})}</span>
            </div>
        </div>
    </div>
  )
}

export default SingleComment