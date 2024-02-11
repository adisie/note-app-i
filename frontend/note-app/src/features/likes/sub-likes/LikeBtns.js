import {
    useSelector,
    useDispatch,
} from 'react-redux'

// actions from slices
// usersSlice
import {
    selectUser,
} from '../../users/usersSlice'
// likesSlice
import {
    addNewLike,
    deleteLike,
    setIsNoteId,
    selectIsLikePending,
    selectIsNoteId,
    selectAllLikes,
} from '../likesSlice'

// icons
// like - off
import { FaRegThumbsUp } from "react-icons/fa"
// like - on 
import { FaThumbsUp } from "react-icons/fa" 

// sub-likes
// LikesCount
import LikesCount from "./LikesCount"
// main
// LikeBtns
const LikeBtns = ({noteId}) => {
    // states from slices
    // users slice
    const user = useSelector(selectUser)
    // likesSlice
    const isNoteId = useSelector(selectIsNoteId)
    const isLikePending = useSelector(selectIsLikePending)
    const allLikes = useSelector(selectAllLikes)

    // hooks
    const dispatch = useDispatch()

    let isNoteLiked = allLikes.find(like => like.noteId === noteId && like.userId === user?._id) 
    


  return (
    <div className='flex items-center'>
        <span>
            <LikesCount noteId={noteId}/>
        </span>
        {
            user 
            ?
            <>
            <>
            {
                isLikePending && isNoteId === noteId 
                ?
                <div className='mx-1 w-[16px] h-[16px] rounded-full border-2 border-emerald-700 border-r-transparent animate-spin'></div>
                :
                <>
                {
                    isNoteLiked 
                    ?
                    <button className='mx-1 text-lg' 
                        onClick={()=>{
                            dispatch(setIsNoteId(noteId))
                            dispatch(deleteLike(noteId))
                        }}
                    >
                        <FaThumbsUp />
                    </button>
                    :
                    <button className='mx-1 text-lg' 
                        onClick={()=>{
                            dispatch(setIsNoteId(noteId))
                            dispatch(addNewLike(noteId))
                        }}
                    >
                        <FaRegThumbsUp />
                    </button>
                }
                </>
            }
            </>
            </>
            :
            <button className='mx-1 text-lg'>
                <FaRegThumbsUp />
            </button>
        }
    </div>
  )
}

export default LikeBtns