import { Skeleton } from "@chakra-ui/react";
import { AllUsersIcon } from "../../../assets/images";
import { useGetAllUserQuery } from "../../../redux/api/users-api";
import { User } from "../../../types";

function People() {
  const { data = [], isLoading } = useGetAllUserQuery(true);
  console.log(data);

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
          : data.map((item: User) => (
              <div key={item._id} className="col-span-4 border-[3px] text-center border-dark-300 rounded-[30px] py-[40px]">
                <img
                  src={import.meta.env.VITE_API_URL + item.photo}
                  className="mx-auto size-[90px] rounded-full"
                  alt=""
                />
                <h1 className="mt-6 text-2xl font-bold">{item.fullName}</h1>
                <p className="text-light-300 mt-2 mb-5">@{item.email}</p>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
      </div>
    </section>
  );
}

export default People;
