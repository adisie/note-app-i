import {useSelector} from 'react-redux'

// actions from slices
// usersSlice
import {
    selectOnlineUsers,
} from '../usersSlice'

// main
// IsOnline
const IsOnline = ({userId}) => {
    // states from slices
    // usersSlice
    const onlineUsers = useSelector(selectOnlineUsers)

    let isUserExist = onlineUsers.find(user => user.userId === userId)
  return (
    <>
    {
        isUserExist 
        ?
        <div className="w-[7px] h-[7px] rounded-full bg-emerald-700"></div>
        :
        <></>
    }
    </>
  )
}

export default IsOnline