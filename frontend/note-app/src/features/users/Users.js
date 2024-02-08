
import {useSelector} from 'react-redux'

// actions from slice
// usersSlice
import {
    selectUsersFlag,
} from './usersSlice'

// sub-users
// Login
import Login from "./sub-users/Login"
// Signup
import Signup from "./sub-users/Signup"
// ForgetPasword
import ForgetPassword from './sub-users/ForgetPassword'

// main
// Users
const Users = () => {
    // states from slices
    // usersSlice
    const usersFlag = useSelector(selectUsersFlag)
   
  return (
    <div className="flex-grow flex justify-center pt-5">
        {
            usersFlag === "LOGIN" 
            ?
            <Login />
            :
            usersFlag === "SIGNUP"
            ?
            <Signup />
            :
            usersFlag === "FORGET-PASSWORD"
            ?
            <ForgetPassword />
            :
            <></>
        }
    </div>
  )
}

export default Users