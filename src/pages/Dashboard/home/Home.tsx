import TopCreator from "../../../components/topCreator/TopCreator";
import { useGetFeedQuery, useGetUserQuery } from "../../../redux/api/users-api";

function Home() {
  const {data = []} = useGetFeedQuery(true)
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = currentUser?.username || "";
  const currentUserData = useGetUserQuery(username);
  console.log(currentUserData)
  console.log(data)
  return (
    <section className="grid grid-cols-12 text-white">
      <div className="col-span-7 text-white px-[53px] py-[60px] bg-black">
        <header>
          assalom
        </header>
      </div>
      <TopCreator/>
    </section>
  );
}

export default Home;
