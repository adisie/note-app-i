import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// actions from slices
// commentsSlice
import {
  setIsComment,
} from '../../comments/commentsSlice'

// testImage
import testImage from '../../../assets/images/test/gonder1.jpg'

// icons
// thumb
import { FaRegThumbsUp } from "react-icons/fa"
// commens
import { AiOutlineMessage } from "react-icons/ai"
// favorite
import { MdFavoriteBorder } from "react-icons/md"
// delete
import { MdDeleteOutline } from "react-icons/md"

// main
// SingleNote
const SingleNote = () => {
  // hooks
  const dispatch = useDispatch()

  return (
    <div className="text-xs text-emerald-900 font-serif p-1 border-b border-emerald-700 border-opacity-[.13] mb-3">
      {/* note-con */}
      <div className="ml-5">
        {/* image-con */}
        <div>
          <img src={testImage} alt="note file" 
            className="max-h-[250px] w-[100%] object-cover my-1"
          />
        </div>
        {/* text-con */}
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque nobis iusto quaerat ut labore asperiores doloribus eligendi aliquam repellat culpa reprehenderit cum adipisci, eius nihil veniam distinctio autem saepe, non minus qui rem vel iure quam. Inventore laboriosam a exercitationem, unde ipsum dolores, sed autem distinctio ullam cumque maiores voluptate excepturi odit modi eaque vitae cum corrupti delectus magnam tenetur iste, repellendus dolore cupiditate explicabo. Tempora, quibusdam modi? Soluta doloribus distinctio deleniti similique earum, tempora odit nihil quo sunt voluptate eaque nisi, voluptas repellat. Iste alias odio quia dolorem non assumenda doloribus, repudiandae consectetur nam dignissimos quis error atque. Tempora.
          </p>
        </div>
      </div>
      {/* author-info */}
      <div className="flex items-center">
        {/* author-profile-name */}
        <NavLink 
          className="flex items-center mr-3"
        >
          <img src={testImage} alt="author profile" 
            className="w-[24px] h-[24px] rounded-full"
          />
          <span className="ml-1">username</span>
        </NavLink>
        {/* controllers */}
        <div className="flex items-center ml-3 my-1">
          {/* like */}
          <div className="flex items-center mr-1">
            <span className='text-md mr-1'>12</span>
            <button className="text-lg">
              <FaRegThumbsUp />
            </button>
          </div>
          {/* comment */}
          <div className="flex items-center mr-1">
            <span className="text-md mr-1">23</span>
            <NavLink className="text-lg mr-1" 
              onClick={()=>{
                dispatch(setIsComment(true))
              }}
            >
              <AiOutlineMessage />
            </NavLink>
          </div>
          <button className='text-xl mx-1'>
            <MdFavoriteBorder />
          </button>
          <button className='text-xl mx-1'>
            <MdDeleteOutline />
          </button>
          <span className='ml-1 italic text-[.65rem]'>date</span>
        </div>
      </div>
    </div>
  )
}

export default SingleNote