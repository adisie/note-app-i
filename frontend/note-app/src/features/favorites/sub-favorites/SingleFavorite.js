import {NavLink} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {useSelector,useDispatch} from 'react-redux'


// actions from slices
// usersSlice
import {
  selectUser,
} from '../../users/usersSlice'

// profilesSlice
import {
  setIsProfiles,
  setIsProfileOwner,
  setIsProfileLocation,
} from '../../profiles/profilesSlice'

// commentsSlice
import {
  setIsComment,
} from '../../comments/commentsSlice'

// global constants
import {
  BASE_URL,
} from '../../../config'

// actions from slices
// notesSlices
import {
  selectNotes,
} from '../../notes/notesSlice'

// icons
// thumb
import { FaRegThumbsUp } from "react-icons/fa"
// commens
import { AiOutlineMessage } from "react-icons/ai"


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


// main
// SingleFavorite
const SingleFavorite = ({noteId}) => {
  // 
  // states from slices
  // notesSlice
  const notes = useSelector(selectNotes)
  let note = notes.find(note => note._id === noteId)

  // usersSlice
  const user = useSelector(selectUser)

  // hooks
  const dispatch = useDispatch()
  
  return (
    <div className="text-xs text-emerald-900 font-serif px-1 border-b border-emerald-700 border-opacity-[.13] mb-3">
       {/* note container */}
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
     {/* author container */}
     <div className="flex items-center py-1">
        {/* user profile and name */}
        <NavLink className={"flex items-center mr-1"} to={"/profiles"} 
          onClick={()=>{
            dispatch(setIsProfiles(note.authorId))
            dispatch(setIsProfileOwner(user?._id === note.authorId))
            dispatch(setIsProfileLocation(true))
          }}
        >
          <GetProfile userId={note.authorId}/>
          <span className="ml-1">
            <GetUsername userId={note.authorId} />
          </span>
        </NavLink>
        {/* IsOnline */}
        <IsOnline userId={note.authorId}/>
        {/* controllers */}
        <div className="flex items-center ml-3 my-1">
          {/* like */}
          <div className="flex items-center mr-1">
            <span className='text-md mr-1'>12</span>
            <button className="text-lg">
              <FaRegThumbsUp />
            </button>
          </div>
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
          
          <span className='ml-1 italic text-[.65rem]'>{formatDistanceToNow(new Date(note.createdAt),{addSuffix: true})}</span>
        </div>
     </div>
    </div>
  )
}

export default SingleFavorite