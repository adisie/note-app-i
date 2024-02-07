import {Outlet,Navigate} from 'react-router-dom'

// main
// PrivateRoutes
const PrivateRoutes = () => {
  return (
    <div>
        {
            !true
            ?
            <Outlet />
            :
            <Navigate to={'/users'} />
        }
    </div>
  )
}

export default PrivateRoutes