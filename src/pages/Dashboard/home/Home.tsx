import TopCreator from "../../../components/topCreator/TopCreator";
import NoImg from "../../../assets/images/no-image.jpg";
import {
  useGetAllUserQuery,
  useGetFeedQuery,
  useGetUserQuery,
} from "../../../redux/api/users-api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

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
function Home() {
  const navigate = useNavigate()
  const formatDate = (dateString: string) => {
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

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;
  const { data: feeds } = useGetFeedQuery(true);
  const { data: currentUserData } = useGetUserQuery(currentUserUsername);
  const { data: allUser } = useGetAllUserQuery(true);

  console.log(feeds)
  
  const UsersCard = (): JSX.Element => {
    return (
      <div className="flex items-center gap-4 overflow-y-auto">
        {currentUserData.following
          .map((user: any, index: number) => (
            <div
              key={index}
              className="text-center flex flex-col min-w-[86px] items-center"
            >
              <img
                src={NoImg}
                onError={(e) => (e.currentTarget.src = NoImg)}
                alt={user.username}
                className="size-12 rounded-full object-cover"
                style={{ width: "48px", height: "48px", objectFit: "cover" }}
              />
              <h1 onClick={() => navigate(`/profile/${user.username}`)} className="text-xs cursor-pointer hover:underline font-semibold mt-[6px]">
                {user.username}
              </h1>
            </div>
          ))}
      </div>
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
            {feeds?.posts?.length ? (
              feeds?.posts?.map((post: any, index: number) => (
                <div
                  key={index}
                  className="px-[29px] py-[36px] border border-dark-400"
                >
                  <header className="mb-[40px] ">
                    <div className="flex gap-[10px]">
                      <img
                        className="size-[50px] rounded-full object-cover"
                        src={
                          import.meta.env.VITE_API_URL +
                          allUser?.find((user: any) => user._id === post?.owner)
                            ?.photo
                        }
                        onError={(e) =>
                          (e.currentTarget.src =
                            import.meta.env.VITE_API_URL +
                            currentUserData?.photo)
                        }
                        alt="Post owner"
                      />
                      <div className="mb-[20px] flex flex-col">
                        <h1 className="text-[18px] font-semibold">
                          {currentUserData?.username}
                        </h1>
                        <p className="text-[14px] text-light-300 font-bold">
                          {formatDate(post?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">{post?.content_alt}</p>
                  </header>
                  <Swiper
                    key={index}
                    navigation={true}
                    spaceBetween={10}
                    modules={[Navigation]}
                  >
                    {post.content &&
                      post.content?.map(
                        (content: any, contentIndex: number) => {
                          if (content?.type == "VIDEO") {
                            return (
                              <SwiperSlide key={contentIndex}>
                                <video controls className="w-full h-[500px] object-contain" src={content?.url}></video>
                              </SwiperSlide>
                            );
                          } if (content?.type === 'IMAGE') {
                            return (
                              <SwiperSlide key={contentIndex}>
                                <img className="w-full h-[500px] object-contain" src={content?.url} />
                              </SwiperSlide>
                            );
                          }
                        }
                      )}
                  </Swiper>
                </div>
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
