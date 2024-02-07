import {NavLink} from 'react-router-dom'

// test-image
import testImage from '../../../assets/images/test/gonder1.jpg'

// icons
// delete 
import { MdDeleteOutline } from "react-icons/md"

// main
// SingleComment
const SingleComment = () => {
  return (
    <div className="mb-3 py-1 text-xs text-emerald-900 font-serif">
        <div className="ml-5 max-w-[450px]">
            <p className="text-justify">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil eum, hic sapiente dolore aliquid in, deserunt eligendi quod iusto quidem repellendus, eaque consequuntur inventore unde ullam. Iste numquam enim at, consequatur placeat aperiam fugiat quibusdam.
            </p>
        </div>
        {/* author-profile and username */}
        <div className="flex items-center">
          {/* profile and name */}
            <NavLink className="flex items-center mr-3">
              <img src={testImage} alt="" className="w-[22px] h-[22px] rounded-full"/>
              <span className="mx-1">username</span>
            </NavLink>
            <div className="flex items-center">
              <button className="text-xl mx-1 opacity-[.75]">
                <MdDeleteOutline />
              </button>
              <span>date</span>
            </div>
        </div>
    </div>
  )
}

export default SingleComment