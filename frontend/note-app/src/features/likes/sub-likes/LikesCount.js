import {useSelector} from 'react-redux'

// actions from slices
// likesSlice
import {
    selectAllLikes,
} from '../likesSlice'

// main
// LikesCount
const LikesCount = ({noteId}) => {
    // states from slices
    // likes
    const allLikes = useSelector(selectAllLikes)


    let noteLikes = allLikes.filter(like => like.noteId === noteId) 

  return (
    <>{noteLikes?.length}</>
  )
}

export default LikesCount