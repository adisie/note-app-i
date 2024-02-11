import {Outlet} from 'react-router-dom'
// sub-profiles
// ProfileHeader
import ProfileHeader from "./sub-profiles/ProfileHeader"

// main
// Profiles
const Profiles = () => {
  return (
    <div className="flex-grow w-[80%] m-1 flex flex-col">
      <ProfileHeader />
      <Outlet />
    </div>
  )
}

export default Profiles