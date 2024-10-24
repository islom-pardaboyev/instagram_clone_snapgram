import TopCreator from "../../../components/topCreator/TopCreator";
import NoImg from "../../../assets/images/no-image.jpg";
import {
  useGetFeedQuery,
  useGetUserQuery,
} from "../../../redux/api/users-api";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import PostCard from "../../../components/postCard/PostCard";
export const imageFileTypes = [
  ".png",
  ".jpeg",
  ".jpg",
  ".gif",
  ".bmp",
  ".webp",
  ".tiff",
  ".svg",
];
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(",", " at");
};

function Home() {
  const navigate = useNavigate();

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;
  const { data: feeds, isLoading } = useGetFeedQuery(true);
  const { data: currentUserData } = useGetUserQuery(currentUserUsername);

  const UsersCard = (): JSX.Element => {
    return (
      <header className="flex items-center gap-4 overflow-y-auto">
        {currentUserData.following.map((user: any, index: number) => (
          <div
            key={index}
            className="text-center flex flex-col min-w-[86px] items-center"
          >
            <img
              src={NoImg}
              alt={user.username}
              className="size-12 rounded-full object-cover"
              style={{ width: "48px", height: "48px", objectFit: "cover" }}
            />
            <h1
              onClick={() => navigate(`/profile/${user.username}`)}
              className="text-xs cursor-pointer hover:underline font-semibold mt-[6px]"
            >
              {user.username}
            </h1>
          </div>
        ))}
      </header>
    );
  };

  return (
    <section className="grid grid-cols-12 h-screen overflow-y-auto text-white">
      <div className="col-span-7 text-white px-[53px] py-[60px] bg-black">
        <header>
          {currentUserData?.following.length ? (
            <div className="flex overflow-x-auto">
              <UsersCard />
            </div>
          ) : (
            <p className="text-center font-bold text-light-300 text-xs">
              Not yet followed User available...
            </p>
          )}
        </header>
        <div className="mt-[40px]">
          <h1 className="text-[30px] mb-[40px] font-bold">Home Feed</h1>
          <div className="flex flex-col gap-[40px]">
            {/* preview post */}
            {isLoading ? (
              <div className="flex flex-col gap-10">
                {[...Array(6)].map((_, index: number) => (
                  <div key={index} className="px-[29px] py-[36px]">
                    <header className="flex items-center gap-[10px] mb-[20px]">
                      <Skeleton
                        width={50}
                        height={50}
                        className="!rounded-full"
                      />
                      <div className="flex flex-col gap-2">
                        <Skeleton width={122} height={25} />
                        <Skeleton width={122} height={25} />
                      </div>
                    </header>
                    <Skeleton width={542} height={22} />
                    <Skeleton
                      className="mt-[30px] !rounded-[30px]"
                      width={540}
                      height={540}
                    />
                  </div>
                ))}
              </div>
            ) : feeds?.posts?.length ? (
              feeds?.posts?.map((post: any, index: number) => (
                <PostCard post={post} key={index} />
              ))
            ) : (
              <p>Not yet post available...</p>
            )}
          </div>
        </div>
      </div>
      <TopCreator />
    </section>
  );
}

export default Home;
