// testimage
import testProfile from '../../../assets/images/profiles/male-profile-3.jpg'


// icons
// delete 
import { MdDeleteOutline } from "react-icons/md"

// main
// ProfileContainer
const ProfileContainer = () => {
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
            <div>
                <button>pre</button>
                <input type="file" name="profile" id="profile" accept="image/*" hidden />
                <label htmlFor="profile">pic</label>
                <button>next</button>
            </div>
        </div>
    </div>
  )
}

export default ProfileContainer