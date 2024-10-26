import { useNavigate } from "react-router-dom";
import {
  useGetAllUserQuery,
  useGetCurrentUserDatasQuery,
} from "../../redux/api/users-api";
import { API } from "../../hook/useEnv";

const FollowingUserCard = (): JSX.Element => {
  const { data: currentUserData } = useGetCurrentUserDatasQuery(true);
  const navigate = useNavigate();
  const { data: allUserData } = useGetAllUserQuery(3000);
  console.log(currentUserData?.following)
  return (
    <header className="flex items-center gap-4 overflow-y-auto">
      {currentUserData?.following?.map((user: any, index: number) => {
        const anotherDatas = allUserData?.find((item: any) => item._id === user._id);
        console.log(anotherDatas)
        return (
          <div
            key={index}
            className="text-center flex flex-col min-w-[86px] items-center"
          >
            <img
              src={anotherDatas?.photo} 
              onError={(e) => e.currentTarget.src = API + anotherDatas?.photo}
              alt={user.username}
              className="size-12 rounded-full object-cover"
            />
            <h1
              onClick={() => navigate(`/profile/${user.username}`)}
              className="text-xs cursor-pointer hover:underline font-semibold mt-[6px]"
            >
              {user.username}
            </h1>
          </div>
        );
      })}
    </header>
  );
};

export default FollowingUserCard;
