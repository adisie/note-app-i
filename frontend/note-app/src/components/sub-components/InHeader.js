import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// usersSlice
import {
  logout,
} from '../../features/users/usersSlice'
// profilesSlice
import {
  setIsProfiles,
  setIsProfileOwner,
  selectIsProfileLocation,
  setIsProfileLocation,
} from '../../features/profiles/profilesSlice'

// sub-users
// GetUsername
import GetUsername from '../../features/users/sub-users/GetUsername'
// sub-profiles
// GetProfile
import GetProfile from '../../features/profiles/sub-profiles/GetProfile'
// main
// InHeader
const InHeader = ({user}) => {

  // states from slices
  // profilesSlice
  const isProfileLocation = useSelector(selectIsProfileLocation)


  // hooks 
  const dispatch = useDispatch()

  return (
    <div className="flex items-center">
        <NavLink 
          className="flex items-center" 
          to={isProfileLocation ? "/" : "/profiles"} 
          onClick={()=>{
            if(isProfileLocation){
              dispatch(setIsProfileLocation(false))
              dispatch(setIsProfileOwner(false))
            }else {
              dispatch(setIsProfileLocation(true))
              dispatch(setIsProfileOwner(true))
            }
            dispatch(setIsProfiles(user?._id))
          }}
          >
            <span className="text-gray-300 mr-1">
              <GetUsername userId={user._id} />
            </span>
            <GetProfile userId={user._id}/>
        </NavLink>
        <button className="border border-gray-300 rounded-sm px-3 py-[.175rem] ml-3 transition-all ease-in-out duration-300 hover:text-emerald-700 hover:bg-gray-300" 
          onClick={()=>{
            dispatch(logout())
          }}
        >logout</button>
    </div>
  )
}

export default InHeader