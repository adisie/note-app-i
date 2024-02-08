import {useSelector} from 'react-redux'

// global constant values
import {
    BASE_URL
} from '../../../config'

// actions from slices
// profilesSlice
import {
    selectProfiles,
} from '../profilesSlice'

// default user profile
import defaultUserProfile from '../../../assets/images/profiles/male-profile-3.jpg'
// main
// GetProfile
const GetProfile = ({userId}) => {
    // states from slices
    // profilesSlice
    const profiles = useSelector(selectProfiles)

    let userProfiles = profiles.find(profile=>profile._id === userId)
    
  return (
    <>
        {
            userProfiles?.profiles?.length > 0 
            ?
            <img src={`${BASE_URL}/${userProfiles?.profiles[userProfiles?.profiles?.length - 1].profilePath}`} alt="user profile" className="w-[24px] h-[24px] rounded-full" />
            :
            <img src={defaultUserProfile} alt="user profile" className="w-[24px] h-[24px] rounded-full" />
        }
    </>
  )
}

export default GetProfile