import TopCreator from "../../../components/topCreator/TopCreator";
import NoImg from "../../../assets/images/no-image.jpg";
import {
  useGetAllUserQuery,
  useGetUserQuery,
} from "../../../redux/api/users-api";
import 'swiper/css';
import 'swiper/css/navigation';

function Home() {
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = currentUser?.username || "";
  const { data: currentUserData } = useGetUserQuery(username);
  const { data: allUser } = useGetAllUserQuery(true);

  console.log(allUser);
  console.log(currentUserData);

  const example = currentUserData?.following?.map((followingUser: any) =>
    allUser?.find((user: any) => user.username === followingUser.username)
  );

  console.log(example);

  const UsersCard = (): JSX.Element => {
    return (
      <div className="flex gap-4 min-w-[96px] max-w-[96px] min-h-[84px] max-h-[84px]">
        {example?.map((user: any, index: number) =>
          user ? (
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
          ) : null
        )}
      </div>
    );
  };

  return (
    <section className="grid grid-cols-12 text-white">
      <div className="col-span-7 text-white px-[53px] py-[60px] bg-black">
        <header>
          {currentUserData?.following?.length ? (
            <div className="flex overflow-x-auto">
              <UsersCard />
            </div>
          ) : (
            <p className="text-center font-bold text-light-300 text-xs">
              No users...
            </p>
          )}
        </header>
      </div>
      <TopCreator />
    </section>
  );
}

export default Home;
