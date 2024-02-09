import {useDispatch} from 'react-redux'

// actions from slices
// profilesSlice
import {
    addNewProfile,
} from '../profilesSlice'

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

    // hooks
    const dispatch = useDispatch()

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
                <button className="absolute top-0 right-0 text-xl">
                    <MdDeleteOutline />
                </button>
                <img src={testProfile} className="w-[120px] h-[120px] rounded-full" alt="" />
            </div>
            {/* nav-con */}
            <div className="flex items-center justify-center py-1">
                <button className='text-2xl mr-1'>
                    <MdArrowCircleLeft />
                </button>
                <input type="file" name="profile" id="profile" accept="image/*" hidden onChange={submitHandler}/>
                <label htmlFor="profile" className="text-2xl cursor-pointer">
                    <FaImage />
                </label>
                <button className='text-2xl ml-1'>
                    <MdArrowCircleRight />
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProfileContainer