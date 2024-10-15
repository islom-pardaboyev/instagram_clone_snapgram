import { useFollowMutation } from "../../redux/api/users-api"
import { User } from "../../types"

type Props = {
    item: User
}

function UserCard({item}:Props) {
    const {_id, fullName, photo } = item
    const [follow] = useFollowMutation()
  return (
    <div
    className="bg-dark-200 col-span-6 flex flex-col gap-[10px] py-6 px-9 rounded-[20px] border border-dark-400"
  >
    <img
      className="size-[54px] rounded-full mx-auto"
      src={import.meta.env.VITE_API_URL + photo}
      alt=""
    />
    <div className="text-center">
      <h1 className="text-[14px] font-semibold">
        {fullName}
      </h1>
      <p className="text-[10px] text-light-300 font-medium">Followed by jsmastery</p>
    </div>
    <button onClick={() => follow(item.username).then(res => console.log(res))} className="px-[18px] py-[6px] font-semibold rounded-lg text-xs w-fit mx-auto bg-purple">Follow</button>
  </div>
  )
}

export default UserCard