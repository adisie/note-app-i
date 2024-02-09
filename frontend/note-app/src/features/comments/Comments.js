import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// commentsSlice
import {
  setIsComment,
} from './commentsSlice'
// usersSlice
import {
  selectUser,
} from '../users/usersSlice'

// sub-comments
// CommentList
import CommentList from './sub-comments/CommentList'
// NewComment
import NewComment from './sub-comments/NewComment'

// icons
// exit
import { RiPictureInPictureExitFill } from "react-icons/ri"

// main
// Comments
const Comments = () => {
  // states from slices
  // usersSlice
  const user = useSelector(selectUser)

  // hooks
  const dispatch = useDispatch()

  return (
    <div className="absolute w-[100%] h-[100%] left-0 top-0 bg-white flex flex-col">
      <button onClick={()=>dispatch(setIsComment(null))} className='absolute z-50 top-1 right-1 text-xl text-red-700 opacity-[.85] transition-all ease-in-out duration-300 hover:opacity-[1]'>
        <RiPictureInPictureExitFill />
      </button>
      <CommentList />
      {
        user && <NewComment />
      }
    </div>
  )
}

export default Comments