
// test image
import testImage from '../../../../assets/images/test/gonder1.jpg'

// icons 
// delete
import { MdDelete } from "react-icons/md"

// main
// SingleMessage
const SingleMessage = ({isOwn}) => {
  return (
    <>
    {
      isOwn 
      ?
      <div className='m-1 mb-3 text-xs font-serif flex justify-end'>
        <div className='max-w-[75%]'>
          {/* message */}
          <div className='bg-black bg-opacity-[.13] p-2 rounded-sm mr-5'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt necessitatibus suscipit error exercitationem.
            </p>
          </div>
          {/* controllers */}
          <div className='flex items-center justify-end py-1'>
            <button 
              className='text-xl mr-3 opacity-[.13] hover:opacity-[.85]'
            >
              <MdDelete />
            </button>
            <span>
              date
            </span>
            {/* name profile */}
            <div className='flex items-center ml-3'>
              <span className='mx-1'>username</span>
              <img src={testImage} alt="" className='w-[24px] h-[24px] rounded-full'/>
            </div>
          </div>
        </div>
      </div>
      :
      <div className='m-1 mb-3 text-xs font-serif'>
          {/* message */}
          <div className='ml-5 max-w-[75%] bg-emerald-700 text-gray-200 p-2 rounded-sm'>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea ipsum exercitationem, provident, molestiae tempora ratione consequuntur error eum officia nihil ipsam placeat obcaecati doloribus? Placeat, incidunt vitae. Impedit reprehenderit aspernatur dolorum natus?
            </p>
          </div>
          {/* author */}
          <div className='flex items-center'>
            {/* profile and username */}
            <div className='flex items-center mr-1'>
              <img src={testImage} alt="user prfile" className='w-[24px] h-[24px] rounded-full' />
              <span className='mx-1'>username</span>
            </div>
            {/* controllers */}
            <div className='flex items-center'>
              <span>date</span>
              <button 
                className='text-xl ml-3 opacity-[.13] hover:opacity-[.85]'
              >
                <MdDelete />
              </button>
            </div>
          </div>
      </div>
    }
    </>
  )
}

export default SingleMessage