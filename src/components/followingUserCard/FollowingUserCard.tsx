import { useNavigate } from "react-router-dom";
import NoImg from "../../assets/images/no-image.jpg";
import {
  useGetCurrentUserDatasQuery,
} from "../../redux/api/users-api";

const FollowingUserCard = (): JSX.Element => {
  const { data: currentUserData } = useGetCurrentUserDatasQuery(true);
  const navigate = useNavigate();

  return (
    <header className="flex items-center gap-4 overflow-y-auto">
      {currentUserData?.following?.map((user: any, index: number) => {
        return (
          <div
            key={index}
            className="text-center flex flex-col min-w-[86px] items-center"
          >
            <img
              src={NoImg}
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
