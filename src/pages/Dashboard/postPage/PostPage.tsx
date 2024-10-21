import { useParams } from "react-router-dom"

function PostPage() {
  const {id} = useParams()
  console.log(id)
  return (
    <div>PostPage</div>
  )
}

export default PostPage