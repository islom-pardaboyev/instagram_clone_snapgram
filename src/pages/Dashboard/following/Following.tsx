import { useParams } from "react-router-dom"

const Following = () => {
    const {username} = useParams()
  return (
    <section className="h-screen w-full bg-black text-white">{username}</section>
  )
}

export default Following