import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

// actions from slices
// usersSlice
import {
  selectUser,
} from '../features/users/usersSlice'

// main
// PrivateRoutes
const PrivateRoutes = () => {
  // states from slices
  // usersSlice
  const user = useSelector(selectUser)
  return (
    <>
        {
            user
            ?
            <Outlet />
            :
            <Navigate to={'/'} />
        }
    </>
  )
}

export default PrivateRoutes