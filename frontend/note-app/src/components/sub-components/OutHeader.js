import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// actions from slices
// usersSlice
import {
    setUsersFlag,
} from '../../features/users/usersSlice'

// main
// OutHeader
const OutHeader = () => {
    // hooks
    const dispatch = useDispatch()

  return (
    <div className='flex items-center'>
        <NavLink
            className="border border-gray-300 rounded-sm px-3 py-[.175rem] ml-3 transition-all ease-in-out duration-300 hover:text-emerald-700 hover:bg-gray-300" 
            to={"/users"} 
            onClick={()=>{
                dispatch(setUsersFlag("LOGIN"))
            }}
        >Login</NavLink>
        <NavLink 
            className="hidden screen-level-3:flex border border-gray-300 rounded-sm px-3 py-[.175rem] ml-3 transition-all ease-in-out duration-300 hover:text-emerald-700 hover:bg-gray-300" 
            to={"/users"} 
            onClick={()=>{
                dispatch(setUsersFlag('SIGNUP'))
            }}
            >Signup</NavLink>
    </div>
  )
}

export default OutHeader