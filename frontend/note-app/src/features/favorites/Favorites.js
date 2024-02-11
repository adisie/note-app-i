import { useSelector } from 'react-redux'

// actions from slices
// commentsSlice
import {
  selectIsComment,
} from '../comments/commentsSlice'

// sub-favorites
// FavoritesList
import FavoritesList from "./sub-favorites/FavoritesList"

// comments
// Comments
import Comments from '../comments/Comments'

// main
// Favorites
const Favorites = () => {
  // states from slices
  // commentsSlice
  const isComment = useSelector(selectIsComment)
  return (
    <div className="flex-grow w-[75%] flex relative">
        <FavoritesList />
        {
        isComment 
        ?
        <Comments /> 
        :
        <></>
      }
    </div>
  )
}

export default Favorites