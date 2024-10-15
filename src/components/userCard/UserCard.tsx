import { useFollowMutation } from "../../redux/api/users-api";
import { User } from "../../types";

type Props = {
  item: User;
};

function UserCard({ item }: Props) {
  const { fullName, photo, username } = item;
  const [follow] = useFollowMutation();
  const handleFollow = (username: string): void => {
    follow(username)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(username);
  };
  return (
    <div className="bg-dark-200 col-span-6 flex flex-col gap-[10px] py-6 px-9 rounded-[20px] border border-dark-400">
      <img
        className="size-[54px] rounded-full mx-auto"
        src={import.meta.env.VITE_API_URL + photo}
        alt=""
      />
      <div className="text-center">
        <h1 className="text-[14px] font-semibold">{fullName}</h1>
        <p className="text-[10px] text-light-300 font-medium">
          Followed by jsmastery
        </p>
      </div>
      <button
        onClick={() => {
          handleFollow(username);
        }}
        className="follow-btn mx-auto"
      >
        Follow
      </button>
    </div>
  );
}

export default UserCard;
