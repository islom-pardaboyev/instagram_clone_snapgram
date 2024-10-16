import { Skeleton } from "@chakra-ui/react";
import { useGetAllUserQuery } from "../../redux/api/users-api";
import { User } from "../../types";
import UserCard from "../userCard/UserCard";

function TopCreator() {
    const { data = [], isLoading } = useGetAllUserQuery(true);
  return (
    <div className="col-span-5 h-screen overflow-y-auto px-6 py-12 bg-dark-200">
        <h1 className="font-bold text-[24px]">Top Creators</h1>
        <div className="grid grid-cols-12 gap-6">
          {isLoading ? (
            [...Array(6)].map((_item, index) => 
              <div key={index} className="col-span-6">
                <Skeleton className="w-full h-[190px] rounded-lg"/>
              </div>
            )
          ) : (
            data.map((item: User) => <UserCard key={item._id} item={item} />)
          )}
        </div>
      </div>
  )
}

export default TopCreator