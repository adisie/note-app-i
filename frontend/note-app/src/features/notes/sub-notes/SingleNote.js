import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {formatDistanceToNow} from 'date-fns'

// global constants
import {
  BASE_URL,
} from '../../../config'

// actions from slices
// commentsSlice
import {
  setIsComment,
} from '../../comments/commentsSlice'
// usersSlice
import {
  selectUser,
} from '../../users/usersSlice'
// notesSlice
import {
  deleteNote,
  selectIsNoteDeleting,
} from '../notesSlice'
// profilesSlice
import {
  setIsProfiles,
  setIsProfileOwner,
  setIsProfileLocation,
} from '../../profiles/profilesSlice'

// icons
// commens
import { AiOutlineMessage } from "react-icons/ai"
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
// sub-comments
// CommentCount
import CommentCount from '../../comments/sub-comments/CommentCount'
// sub-favorites
// FavoriteBtns
import FavoriteBtns from '../../favorites/sub-favorites/FavoriteBtns'

// likes
import Likes from '../../likes/Likes'

// main
// SingleNote
const SingleNote = ({note}) => {
  // states from slices
  // usersSlice
  const user = useSelector(selectUser)
  // notesSlice
  const isNoteDeleting = useSelector(selectIsNoteDeleting) 
  // hooks
  const dispatch = useDispatch()

  return (
    <div className="text-xs text-emerald-900 font-serif px-1 border-b border-emerald-700 border-opacity-[.13] mb-3">
      {/* note-con */}
      <div className="ml-5">
        {/* image-con */}
        {
          note.filePath 
          ?
          <div>
            <img src={`${BASE_URL}/${note.filePath}`} alt="note file" 
              className="max-h-[250px] w-[100%] object-cover my-1"
            />
          </div>
          :
          <></>
        }
        {/* text-con */}
        {
          note.note 
          ?
          <div>
            <p className="text-justify">
              {note.note}
            </p>
          </div>
          :
          <></>
        }
      </div>
      {/* author-info */}
      <div className="flex items-center">
        {/* author-profile-name */}
        <NavLink to={'/profiles'} 
          className="flex items-center mr-1" 
          onClick={()=>{
            dispatch(setIsProfiles(note.authorId))
            dispatch(setIsProfileOwner(user?._id === note.authorId))
            dispatch(setIsProfileLocation(true))
          }}
        >
          <GetProfile userId={note.authorId}/>
          <span className="ml-1">
            <GetUsername userId={note.authorId}/>
          </span>
        </NavLink>
        {/* IsOnline */}
        <IsOnline userId={note.authorId}/>
        {/* controllers */}
        <div className="flex items-center ml-3 my-1">
          {/* like */}
          <Likes noteId={note._id}/>
          {/* comment */}
          <div className="flex items-center mr-1">
            <span className="text-md mr-1">
              <CommentCount noteId={note._id}/>
            </span>
            <NavLink className="text-lg mr-1" 
              onClick={()=>{
                dispatch(setIsComment(note._id))
              }}
            >
              <AiOutlineMessage />
            </NavLink>
          </div>
          {/* favorites */}
          {
            user
            ?
            <FavoriteBtns user={user} note={note}/>
            :
            <></>
          }
          {
            user?._id === note.authorId 
            ?
            <>
            {
              isNoteDeleting 
              ?
              <div className=" mr-1 w-[12px] h-[12px] border-2 border-emerald-700 rounded-full border-r-transparent animate-spin"></div>
              :
              <button className='text-xl mx-1' 
              onClick={()=>{
                dispatch(deleteNote(note._id))
              }}
            >
              <MdDeleteOutline />
            </button>
            }
            </>
            :
            <></>
          }
          <span className='ml-1 italic text-[.65rem]'>{formatDistanceToNow(new Date(note.createdAt),{addSuffix: true})}</span>
        </div>
      </div>
    </div>
  )
}

export default SingleNote