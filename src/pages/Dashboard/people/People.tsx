import { Skeleton } from "@chakra-ui/react";
import { AllUsersIcon } from "../../../assets/images";
import { useFollowMutation, useGetAllUserQuery, useGetUserQuery, useUnfollowMutation } from "../../../redux/api/users-api";
import { User } from "../../../types";

function People() {
  const { data = [], isLoading } = useGetAllUserQuery(true);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = currentUser?.username || "";
  const currentUserData = useGetUserQuery(username);
  const handleFollow = (username: string): void => {
    follow(username)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleUnfollow = (username: string): void => {
    unfollow(username)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  console.log(data);

  return (
    <section className="h-screen overflow-y-auto bg-black flex flex-col gap-10 text-white px-[60px] py-[80px]">
      <div className="flex items-center gap-[10px]">
        <AllUsersIcon />
        <h1 className="text-[36px] font-bold">All Users</h1>
      </div>

      <div className="grid grid-cols-12 gap-12">
        {isLoading
          ? [...Array(6)].map((_item, index) => (
              <Skeleton
                key={index}
                className="col-span-4 h-[190px] rounded-lg"
              />
            ))
          : data.map((user: User) => (
            <div
            key={user._id}
            className="bg-dark-200 col-span-6 flex flex-col gap-[10px] py-6 px-9 rounded-[20px] border border-dark-400"
          >
            <img
              className="size-[54px] rounded-full mx-auto"
              src={import.meta.env.VITE_API_URL + user.photo}
              alt=""
            />
            <div className="text-center">
              <h1 className="text-[14px] font-semibold">{user.fullName}</h1>
              <p className="text-[10px] text-light-300 font-medium">
                Followed by jsmastery
              </p>
            </div>
            {currentUserData.data?.following?.some(
              (item: any) => item.username === user.username
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
    </section>
  );
}

export default People;
