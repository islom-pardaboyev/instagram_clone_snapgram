import { Skeleton } from "@chakra-ui/react";
import { useGetAllUserQuery } from "../../redux/api/users-api";
import { User } from "../../types";
import UseCard from "../userCard/UserCard";

function TopCreator() {
  const { data = [], isLoading } = useGetAllUserQuery(true);
  return (
    <aside className="col-span-5 sticky top-0 right-0 h-screen overflow-y-auto px-6 py-12 bg-dark-200">
      <h1 className="font-bold text-[24px]">Top Creators</h1>
      <div className="grid grid-cols-12 gap-6 mt-10">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <div key={index} className="col-span-6">
                <Skeleton className="w-full h-[190px] rounded-lg" />
              </div>
            ))
          : data.map((user: User, index:number) => <UseCard user={user} key={index}/>)}
      </div>
    </aside>
  );
}

export default TopCreator;
