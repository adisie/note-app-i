import { MdOutlineDriveFileRenameOutline } from "react-icons/md"

// main
// Header
const Header = () => {
  return (
    <header className="w-full bg-emerald-700 text-gray-300 font-serif">
        <div className="max-w-[720px] mx-auto px-3 py-1">
            <div>
                <button className="text-xl flex items-center">
                    <MdOutlineDriveFileRenameOutline /> 
                    <span className="text-gray-200 font-black">File</span>
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header