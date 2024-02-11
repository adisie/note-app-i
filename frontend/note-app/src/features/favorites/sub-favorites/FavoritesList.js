import {useSelector} from 'react-redux'

// actions from slices
// favoritesSlice
import {
    selectMyFavorites
} from '../favoritesSlice'

// sub-favorites
// SIngleFavorite
import SingleFavorite from "./SingleFavorite"
// main
// FavoritesList
const FavoritesList = () => {
    // states from slices
    // favoritesSlice
    const myFavorites = useSelector(selectMyFavorites) 
  return (
    <div className='flex-grow w-[75%] m-1 p-1  h-[93vh] overflow-y-auto' id='favorites-list-container'>
        {
          myFavorites.map(favorite=>(
            <SingleFavorite key = {favorite._id} noteId = {favorite.noteId}/>
          ))
        }
    </div>
  )
}

export default FavoritesList