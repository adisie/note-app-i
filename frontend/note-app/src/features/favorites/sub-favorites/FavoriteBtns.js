import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// favorites slice
import {
    addNewFavorite,
    selectMyFavorites,
    removeFavorite,
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

    console.log(myFavorites)

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
                <button className='text-xl' 
                    onClick={()=>{
                        console.log('remove me',note._id)
                        dispatch(removeFavorite(isFavorite._id))
                    }}
                >
                    <MdFavorite />
                </button>
                :
                <button className='text-xl' 
                    onClick={()=>{
                        console.log('add me',note._id)
                        // dispatch(addNewFavorite(note._id))
                    }}
                >
                    <MdOutlineFavoriteBorder />
                </button>
            }
        </>
        :
        <></>
    }
    </>
  )
}

export default FavoriteBtns