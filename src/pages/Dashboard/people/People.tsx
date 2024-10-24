import { Skeleton, Spinner } from "@chakra-ui/react";
import { AllUsersIcon } from "../../../assets/images";
import { useGetAllUserQuery } from "../../../redux/api/users-api";
import { User } from "../../../types";
import UseCard from "../../../components/userCard/UserCard";
import { useState, useEffect } from "react";

function People() {
  const [limit, setLimit] = useState<number>(20);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { data = [], isLoading } = useGetAllUserQuery(limit);

  const handleSeeMore = () => {
    if (limit === data?.length) {
      setIsLoadingMore(true); 
      setLimit((prev) => prev + 20);
    } else {
      setLimit(20); 
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoadingMore(false);
    }
  }, [isLoading]);

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
                className="col-span-4 h-[190px] !rounded-[30px]"
              />
            ))
          : data.map((user: User, index:number) => (
              <UseCard key={index} three={true} user={user} />
            ))}
      </div>

      {isLoadingMore && (
        <div className="flex justify-center">
          <Spinner size="xl" color="white" />
        </div>
      )}

      <button
        className="mt-5 text-white py-2 px-4 w-fit ml-auto bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleSeeMore}
      >
        {limit === data?.length ? "See more" : "Show less"}
      </button>
    </section>
  );
}

export default People;
