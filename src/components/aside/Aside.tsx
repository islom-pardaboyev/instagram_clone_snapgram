import { NavLink } from "react-router-dom";
import {
  ChatIcon,
  CreatePostIcon,
  ExploreIcon,
  HomeIcon,
  PeopleIcon,
  ReelsIcon,
  SavedIcon,
} from "../../assets/images";
import { useGetUserQuery } from "../../redux/api/users-api";
import LogoPng from '../../assets/images/Logo.png'
import { Skeleton } from "@chakra-ui/react";

function Aside() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = userData?.username || "";
  const { data, isLoading } = useGetUserQuery(username);
  
  const navbarItemsFirst = [
    {
      id: 1,
      title: "Home",
      Icon: <HomeIcon />,
      path: "/",
    },
    {
      id: 2,
      title: "Explore",
      Icon: <ExploreIcon />,
      path: "/explore",
    },
    {
      id: 3,
      title: "People",
      Icon: <PeopleIcon />,
      path: "/people",
    },
    {
      id: 4,
      title: "Saved",
      Icon: <SavedIcon />,
      path: "/saved",
    },
    {
      id: 5,
      title: "Reels",
      Icon: <ReelsIcon />,
      path: "/reels",
    },
    {
      id: 6,
      title: "Chats",
      Icon: <ChatIcon />,
      path: "/chats",
    },
    {
      id: 7,
      title: "Create Post",
      Icon: <CreatePostIcon />,
      path: "/create",
    },
  ];
  return (
    <aside className="col-span-2 px-[24px] bg-dark-200 h-screen overflow-y-auto text-white pt-[48px] pb-[32px]">
      <div className="flex flex-col gap-11 h-full">
        <div className="flex items-center gap-[10px]">
          {isLoading ? <Skeleton width='100%' height='40px'/> : <img src={data?.photo} className="w-[40px] h-[40px] rounded-full" alt="" />}
          {isLoading ? <Skeleton width='100%' height='20px'/> : <div className="flex flex-col text-white">
            <h1 className="text-[18px] font-bold line-clamp-1">{data?.fullName}</h1>
            <p className="text-[14px] line-clamp-1 text-light-300">@{data?.username}</p>
          </div>}
          
        </div>
      <img src={LogoPng} className="w-[171px] h-[36px]" alt="" />
        <nav className="flex flex-col gap-6 h-full">
          {navbarItemsFirst.map((item) => (
            <NavLink key={item.id} to={item.path} className={"flex gap-4 p-4"}>
              <p className="text-primary_500">{item.Icon}</p>
              <p>{item.title}</p>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Aside;
