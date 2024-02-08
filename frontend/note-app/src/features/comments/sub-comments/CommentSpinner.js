
// main
// CommentSpinner
const CommentSpinner = () => {
  return (
    <div className="flex items-center">
        <div className="relative">
            <div className="absolute bottom-0 left-12 w-[24px] h-[24px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin"></div>
        </div>
    </div>
  )
}

export default CommentSpinner