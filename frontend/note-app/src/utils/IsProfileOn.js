import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

// actions from slices
// profilesSlice
import {
    selectIsProfileLocation,
} from '../features/profiles/profilesSlice'

// main
// PrivateRoutes
const IsProfileOn = () => {
    // states from slices
    // profilesSlice
    const isProfileLocation = useSelector(selectIsProfileLocation)

  return (
    <>
        {
            isProfileLocation
            ?
            <Outlet />
            :
            <Navigate to={'/'} />
        }
    </>
  )
}

export default IsProfileOn