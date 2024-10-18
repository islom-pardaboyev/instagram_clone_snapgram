import TopCreator from "../../../components/topCreator/TopCreator";
import NoImg from "../../../assets/images/no-image.jpg";
import {
  useGetAllUserQuery,
  useGetFeedQuery,
  useGetUserQuery,
} from "../../../redux/api/users-api";

function Home() {
  const imageFileTypes = [
    ".png",
    ".jpeg",
    ".jpg",
    ".gif",
    ".bmp",
    ".webp",
    ".tiff",
    ".svg",
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // For AM/PM format
    };

    // Format date in "26 June at 09:32 PM" format
    return date.toLocaleString("en-US", options).replace(",", " at");
  };

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;
  const { data: feeds } = useGetFeedQuery(true);
  const { data: currentUserData } = useGetUserQuery(currentUserUsername);
  const { data: allUser } = useGetAllUserQuery(true);
  const example = currentUserData?.following?.map((followingUser: any) =>
    allUser?.find((user: any) => user.username === followingUser.username)
  );

  const UsersCard = (): JSX.Element => {
    return (
      <div className="flex gap-4 w-[96px] h-[84px]">
        {example
          ?.filter((user: any) => user)
          .map((user: any, index: number) => (
            <div key={index} className="text-center flex flex-col items-center">
              <img
                src={import.meta.env.VITE_API_URL + user.photo}
                onError={(e) => (e.currentTarget.src = NoImg)}
                alt={user.username}
                className="size-12 rounded-full object-cover"
                style={{ width: "48px", height: "48px", objectFit: "cover" }}
              />
              <h1 className="text-xs font-semibold mt-[6px]">
                {user.username}
              </h1>
            </div>
          ))}
      </div>
    );
  };

  const findPostOwner = allUser?.filter((user: any) =>
    feeds?.posts?.some((item: any) => item?.owner === user._id)
  );

  console.log(findPostOwner);
  console.log(feeds?.posts);

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
              No...
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
                    <div className="mb-[20px] flex flex-col">
                      <h1 className="text-[18px] font-semibold">
                        {post?.owner}
                      </h1>
                      <p className="text-[14px] text-light-300 font-bold">
                        {formatDate(post?.createdAt)}
                      </p>
                    </div>
                    <p className="font-semibold">{post?.content_alt}</p>
                  </header>
                  <div>
                    {post.content?.map((content: any) => {
                      if (
                        imageFileTypes.some((type) => content.includes(type))
                      ) {
                        return (
                          <img
                            className="rounded-[30px]"
                            key={content}
                            src={import.meta.env.VITE_API_URL + content}
                            onError={(e) => (e.currentTarget.src = NoImg)}
                            alt="Post content"
                          />
                        );
                      } else if (
                        !imageFileTypes.some((type) => content.includes(type))
                      ) {
                        return (
                          <video
                            src={import.meta.env.VITE_API_URL + content}
                          ></video>
                        );
                      }
                    })}
                  </div>
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
