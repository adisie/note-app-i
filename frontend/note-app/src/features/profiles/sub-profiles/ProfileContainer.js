import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

// global constants
import {
    BASE_URL,
} from '../../../config'

// actions from slices
// profilesSlice
import {
    addNewProfile,
    selectIsProfilePending,
    selectIsProfiles,
    selectIsProfileOwner,
    deleteProfile,
    selectIsProfileDeleting,
    selectProfileCurrentIndex,
    setProfileCurrentIndex,
} from '../profilesSlice'
// usersSlice
import {
    selectUser,
} from '../../users/usersSlice'

// testimage
import testProfile from '../../../assets/images/profiles/male-profile-3.jpg'


// icons
// delete 
import { MdDeleteOutline } from "react-icons/md"
// image
import { FaImage } from "react-icons/fa6"
// left arrow
import { MdArrowCircleLeft } from "react-icons/md"
// right arrow
import { MdArrowCircleRight } from "react-icons/md"


// main
// ProfileContainer
const ProfileContainer = () => {

    // states from slices
    // profilesSlice
    const isProfilePending = useSelector(selectIsProfilePending)
    const isProfiles = useSelector(selectIsProfiles)
    const isProfileOwner = useSelector(selectIsProfileOwner)
    const isProfileDeleting = useSelector(selectIsProfileDeleting)
    const profileCurrentIndex = useSelector(selectProfileCurrentIndex)

    // usersSlice
    const user = useSelector(selectUser)

    // hooks
    const dispatch = useDispatch()

    // image navigation
    const navigateImage = index => {
        if(index > 0){
            if(profileCurrentIndex === 0){
                dispatch(setProfileCurrentIndex(isProfiles.length - 1))
            }else{
                dispatch(setProfileCurrentIndex(profileCurrentIndex - 1))
            }
        }else {
            if(profileCurrentIndex === isProfiles.length - 1){
                dispatch(setProfileCurrentIndex(0))
            }else{
                dispatch(setProfileCurrentIndex(profileCurrentIndex + 1))
            }
        }
    }

    // profile submit handler
    const submitHandler = e => {
        const formData = new FormData()
        formData.append('profile',e.target.files[0])
        dispatch(addNewProfile(formData))
    }
  return (
    <div className="flex items-center justify-center" id="profile-container-con">
        <div className="flex flex-col items-center justify-center">
            {/* image-con */}
            <div className="relative">
                {
                    user && isProfileOwner && isProfiles.length > 0
                    ?
                    <>
                        {
                            isProfileDeleting 
                            ?
                            <div className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full border-4 border-gray-300 border-r-transparent animate-spin"></div>
                            :
                            <button className="absolute top-0 right-0 text-xl" 
                                onClick={()=>{
                                    dispatch(deleteProfile(isProfiles[profileCurrentIndex]._id))
                                }}
                            >
                                <MdDeleteOutline />
                            </button>
                        }
                    </>
                    :
                    <></>
                }
                {
                    isProfiles.length > 0 && profileCurrentIndex !== null
                    ?
                    <img src={`${BASE_URL}/${isProfiles[profileCurrentIndex].profilePath}`} className="w-[120px] h-[120px] rounded-full" alt="" />
                    :
                    <img src={testProfile} className="w-[120px] h-[120px] rounded-full" alt="" />

                }
            </div>
            {/* nav-con */}
            <div className="flex items-center justify-center py-1">
                {
                    isProfiles.length > 1
                    ?
                    <button className='text-2xl mr-1' 
                        onClick={()=>{
                            navigateImage(-1)
                        }}
                    >
                        <MdArrowCircleLeft />
                    </button>
                    :
                    <></>
                }
                <input type="file" name="profile" id="profile" accept="image/*" hidden onChange={submitHandler}/>
                {
                    user && isProfileOwner 
                    ?
                    <>
                        {
                            isProfilePending 
                            ?
                            <div className="w-[24px] h-[24px] rounded-full border-4 border-gray-300 border-r-transparent animate-spin"></div>
                            :
                            <label htmlFor="profile" className="text-2xl cursor-pointer" >
                                <FaImage />
                            </label>
                        }
                    </>
                    :
                    <></>
                }
                {
                    isProfiles.length > 1
                    ?
                    <button className='text-2xl ml-1' 
                        onClick={()=>{
                            navigateImage(1)
                        }}
                    >
                        <MdArrowCircleRight />
                    </button>
                    :
                    <></>
                }
            </div>
        </div>
    </div>
  )
}

export default ProfileContainer