import { Skeleton } from "@chakra-ui/react";
import { AllUsersIcon } from "../../../assets/images";
import { useGetAllUserQuery } from "../../../redux/api/users-api";
import { User } from "../../../types";
import UseCard from "../../../components/userCard/UserCard";

function People() {
  const { data = [], isLoading } = useGetAllUserQuery(true);

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
          <UseCard user={user}/>
            ))}
      </div>
    </section>
  );
}

export default People;
