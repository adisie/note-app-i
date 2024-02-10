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
    <div>
        {
            isProfileLocation
            ?
            <Outlet />
            :
            <Navigate to={'/'} />
        }
    </div>
  )
}

export default IsProfileOn