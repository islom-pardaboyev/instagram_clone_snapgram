import { Skeleton } from "@chakra-ui/react";
import {
  useFollowMutation,
  useGetAllUserQuery,
  useGetUserQuery,
  useUnfollowMutation,
} from "../../redux/api/users-api";
import { User } from "../../types";
import NoImg from '../../assets/images/no-image.jpg'

function TopCreator() {
  const { data = [], isLoading } = useGetAllUserQuery(true);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = currentUser?.username || "";
  const currentUserData = useGetUserQuery(username);
  const handleFollow = (username: string): void => {
    follow(username)
     
     
  };

  const handleUnfollow = (username: string): void => {
    unfollow(username)
  };

  return (
    <aside className="col-span-5 absolute top-0 right-0 h-screen overflow-y-auto px-6 py-12 bg-dark-200">
      <h1 className="font-bold text-[24px]">Top Creators</h1>
      <div className="grid grid-cols-12 gap-6 mt-10">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <div key={index} className="col-span-6">
                <Skeleton className="w-full h-[190px] rounded-lg" />
              </div>
            ))
          : data.map((user: User) => (
              <div
                key={user._id}
                className="bg-dark-200 col-span-6 flex flex-col gap-[10px] py-6 px-9 rounded-[20px] border border-dark-400"
              >
                <img
                  className="size-[54px] rounded-full mx-auto"
                  src={import.meta.env.VITE_API_URL + user.photo}
                  onError={(e) => e.currentTarget.src = NoImg}
                  alt=""
                />
                <div className="text-center">
                  <h1 className="text-[14px] font-semibold">{user.fullName}</h1>
                  <p className="text-[10px] text-light-300 font-medium">
                    Followed by jsmastery
                  </p>
                </div>
                {currentUserData.data?.following?.some(
                  (item: any) => item.username == user.username
                ) ? (
                  <button
                    onClick={() => {
                      handleUnfollow(user.username);
                    }}
                    className="unfollow-btn capitalize mx-auto"
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleFollow(user.username);
                    }}
                    className="follow-btn capitalize mx-auto"
                  >
                    follow
                  </button>
                )}
              </div>
            ))}
      </div>
    </aside>
  );
}

export default TopCreator;
