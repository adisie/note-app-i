import {useSelector} from 'react-redux'

// actions from slices
// usersSlice
import {
    selectUsers,
} from '../usersSlice'

// main
// GetUsername
const GetUsername = ({userId}) => {
    // states from slices
    // usersSlice
    const users = useSelector(selectUsers)

    let user = users?.find(user=>user._id === userId)
  return (
    <>{user?.username}</>
  )
}

export default GetUsername