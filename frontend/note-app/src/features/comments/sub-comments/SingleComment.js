import {NavLink} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import { useSelector } from 'react-redux'

// actions from slices
// usersSlice
import {
  selectUser,
} from '../../users/usersSlice'

// icons
// delete 
import { MdDeleteOutline } from "react-icons/md"

// sub-users
// GetUsername
import GetUsername from '../../users/sub-users/GetUsername'
// sub-profiles
// GetProfile
import GetProfile from '../../profiles/sub-profiles/GetProfile'

// main
// SingleComment
const SingleComment = ({comment}) => {
  // states from slices
  // usersSlice
  const user = useSelector(selectUser)

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
            <NavLink className="flex items-center mr-3">
              <GetProfile userId={comment.authorId}/>
              <span className="mx-1">
                <GetUsername userId={comment.authorId}/>
              </span>
            </NavLink>
            <div className="flex items-center">
              {
                user?._id === comment.authorId 
                ?
                <button className="text-xl mx-1 opacity-[.75]">
                  <MdDeleteOutline />
                </button>
                :
                <></>
              }
              <span>{formatDistanceToNow(new Date(comment.createdAt),{addSuffix: true})}</span>
            </div>
        </div>
    </div>
  )
}

export default SingleComment