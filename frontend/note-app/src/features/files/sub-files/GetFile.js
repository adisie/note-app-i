import {
    BASE_URL,
} from '../../../config'

// GetFile
const GetFile = ({file}) => {
  return (
    <div className='my-3'>
        {
            file.split('\\')[3] === 'image'
            ?
            <div className='m-1'>
                <img src={`${BASE_URL}/${file}`} alt="" className='h-[250px] w-full object-cover' />
            </div>
            :
            file.split('\\')[3] === 'audio'
            ?
            <div className='m-1'>
                <audio controls>
                    <source src={`${BASE_URL}/${file}`}/>
                </audio>
            </div>
            :
            file.split('\\')[3] === 'video'
            ?
            <div className='m-1'>
                <video controls>
                    <source src={`${BASE_URL}/${file}`}/>
                </video>
            </div>
            :
            file.split('\\')[3] === 'application'
            ?
            <div></div>
            :
            <></>
        }
    </div>
  )
}

export default GetFile