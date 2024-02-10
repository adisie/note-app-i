import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// favorites slice
import {
    addNewFavorite,
    selectMyFavorites,
    removeFavorite,
    selectIsFavoritePending,
    setNoteId,
    selectNoteId,
} from '../favoritesSlice'

// icons
// favorite - true 
import { MdFavorite } from "react-icons/md"
// favorite - false
import { MdOutlineFavoriteBorder } from "react-icons/md"
// main
// FavoriteBtns
const FavoriteBtns = ({user,note}) => {
    // states from slices
    // favorites slice
    const myFavorites = useSelector(selectMyFavorites)
    const isFavoritePending = useSelector(selectIsFavoritePending)
    const noteId = useSelector(selectNoteId)

    let isFavorite = myFavorites.find(favorite => favorite.noteId === note._id)

    // hooks
    const dispatch = useDispatch()

    

  return (
    <>
    {
        user?._id !== note.authorId 
        ?
        <>
            {
                isFavorite
                ?
                <>
                {
                    isFavoritePending && noteId === isFavorite.noteId 
                    ?
                    <div className='w-[16px] h-[16px] rounded-full border-2 border-emerald-700 border-r-transparent animate-spin'></div>
                    :
                    <button className='text-xl' 
                        onClick={()=>{
                            dispatch(setNoteId(isFavorite.noteId))
                            dispatch(removeFavorite(isFavorite._id))
                        }}
                    >
                        <MdFavorite />
                    </button>
                }
                </>
                :
                <>
                {
                    isFavoritePending && noteId === note._id 
                    ?
                    <div className='w-[16px] h-[16px] rounded-full border-2 border-emerald-700 border-r-transparent animate-spin'></div>
                    :
                    <button className='text-xl' 
                        onClick={()=>{
                            dispatch(setNoteId(note._id))
                            dispatch(addNewFavorite(note._id))
                        }}
                    >
                        <MdOutlineFavoriteBorder />
                    </button>
                }
                </>
            }
        </>
        :
        <></>
    }
    </>
  )
}

export default FavoriteBtns