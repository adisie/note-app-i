
// sub-profiles
// ProfileContainer
import ProfileContainer from "./ProfileContainer"
// ProfileNav
import ProfileNav from "./ProfileNav"
// main
// ProfileHeader
const ProfileHeader = () => {

    // toggle profile container
    const profileToggler = () => {
        let profileName = document.getElementById('profile-header-user-name-profile')
        let profileContainer = document.getElementById('profile-container-con')
        let pNoteContainer = document.getElementById('p-note-container')

        if(profileName?.classList.contains("hidden")){
            profileName?.classList.remove('hidden')
            profileName?.classList.add('flex')
            profileContainer?.classList.add('hidden')
            profileContainer?.classList.remove('flex')
            pNoteContainer?.classList.add('h-[85vh]')
            pNoteContainer?.classList.remove('h-[65vh]')
        }else{
            profileName?.classList.add('hidden')
            profileName?.classList.remove('flex')
            profileContainer?.classList.remove('hidden')
            profileContainer?.classList.add('flex')
            pNoteContainer?.classList.remove('h-[85vh]')
            pNoteContainer?.classList.add('h-[65vh]')
        }
    }
  return (
    <div className="bg-emerald-700 text-gray-300 p-1 relative">
        <button className="absolute top-0 right-0" onClick={profileToggler}>close</button>
        <ProfileContainer />
        <ProfileNav />
    </div>
  )
}

export default ProfileHeader