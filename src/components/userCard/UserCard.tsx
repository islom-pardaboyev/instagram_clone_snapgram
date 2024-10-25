import { useNavigate } from "react-router-dom";
import { API } from "../../hook/useEnv";
import {
  useFollowMutation,
  useGetUserQuery,
  useUnfollowMutation,
} from "../../redux/api/users-api";

function UseCard({ user, three }: { user: any, three?:boolean }) {
  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unfollow, { isLoading: isUnfollowLoading }] = useUnfollowMutation();
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = currentUser?.username || "";
  const navigate = useNavigate()
  const { data: currentUserData } = useGetUserQuery(username);
  const handleFollow = (username: string): void => {
    follow(username);
  };

  const handleUnfollow = (username: string): void => {
    unfollow(username);
  };
  return (
    <div
      key={user._id}
      className={`bg-dark-200 ${three ? 'col-span-4' : 'col-span-6' }  flex flex-col gap-[10px] py-6 px-9 rounded-[20px] border border-dark-400`}
    >
      <img
        className={`size-[54px] ${three && 'mb-6'} rounded-full object-cover mx-auto`}
        src={user.photo}
        onClick={() => navigate(`/profile/${user.username}`)}
        onError={(e) => (e.currentTarget.src = API + user.photo)}
        alt=""
      />
      <div className={`${three && 'mb-5'} text-center`}>
        <div
          onClick={() => navigate(`/profile/${user.username}`)}
          className={`${three && 'mb-2'} text-[14px] font-semibold line-clamp-1 hover:underline`}
        >
          {user.fullName}
        </div>
        <p className="text-[10px] text-light-300 font-medium">
          Followed by jsmastery
        </p>
      </div>
      {currentUserData?.following?.length > 0 &&
      currentUserData.following.some((item: any) => item._id === user._id) ? (
        <button
          onClick={() => {
            handleUnfollow(user.username);
          }}
          className="unfollow-btn capitalize mx-auto"
        >
          {isUnfollowLoading ? "loading..." : "unfollow"}
        </button>
      ) : (
        <button
          onClick={() => {
            handleFollow(user.username);
          }}
          className="follow-btn capitalize mx-auto"
        >
          {isFollowLoading ? "loading..." : "follow"}
        </button>
      )}
    </div>
  );
}

export default UseCard;
