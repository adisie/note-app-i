import {Outlet} from 'react-router-dom'
// sub-profiles
// ProfileHeader
import ProfileHeader from "./sub-profiles/ProfileHeader"

// main
// Profiles
const Profiles = () => {
  // adjust profile header on scroll
  const adjustProfileHeader = e => {
    console.log("Hello, World")
  }
  return (
    <div className="flex-grow w-[80%] m-1 flex flex-col" onScroll={adjustProfileHeader}>
      <ProfileHeader />
      <Outlet />
    </div>
  )
}

export default Profiles