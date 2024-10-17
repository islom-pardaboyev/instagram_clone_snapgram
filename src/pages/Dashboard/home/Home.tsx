import TopCreator from "../../../components/topCreator/TopCreator";
import NoImg from "../../../assets/images/no-image.jpg";
import {
  useGetAllUserQuery,
  useGetUserQuery,
} from "../../../redux/api/users-api";

function Home() {
  const currentUserUsername = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData') as string).username
    : null;

  const { data: currentUserData } = useGetUserQuery(currentUserUsername);
  const { data: allUser } = useGetAllUserQuery(true);

  const example = currentUserData?.following?.map((followingUser: any) =>
    allUser?.find((user: any) => user.username === followingUser.username)
  );

  const UsersCard = (): JSX.Element => {
    return (
      <div className="flex gap-4 min-w-[96px] max-w-[96px] min-h-[84px] max-h-[84px]">
        {example
          ?.filter((user: any) => user) // null foydalanuvchilarni olib tashlaymiz
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

  return (
    <section className="grid grid-cols-12 text-white">
      <div className="col-span-7 text-white px-[53px] py-[60px] bg-black">
        <header>
          {currentUserData?.following.length ? (
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
