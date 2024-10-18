import { NavLink, useNavigate } from "react-router-dom";
import {
  ChatIcon,
  CreatePostIcon,
  ExploreIcon,
  HomeIcon,
  LogOutIcon,
  PeopleIcon,
  ReelsIcon,
  SavedIcon,
  SettignsIcon,
} from "../../assets/images";
import { useGetUserQuery } from "../../redux/api/users-api";
import LogoPng from "../../assets/images/Logo.png";
import { Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "antd";

function Aside() {
  const currentUserUsername = window.localStorage.getItem('userData') ? JSON.parse(window.localStorage.getItem('userData') as string).username : null;
  const navigate = useNavigate()
  const { data, isLoading } = useGetUserQuery(currentUserUsername);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  console.log(data)

  const handleLogOut = () => {
    window.localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
    navigate('/')
    setIsOpenModal(false);
  };

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
  const navbarItemsLast = [
    {
      id: 1,
      title: "Logout",
      Icon: <LogOutIcon />,
    },
    {
      id: 2,
      title: "Settings",
      Icon: <SettignsIcon />,
    },
  ];
  return (
    <aside className="col-span-2 px-[24px] bg-dark-200 h-screen overflow-y-auto text-white pt-[48px] pb-[32px]">
      <div className="flex flex-col gap-11 h-full">
        <img src={LogoPng} className="w-[171px] h-[36px]" alt="" />
        <div className="flex items-center gap-[10px]">
          {isLoading ? (
            <Skeleton width="100%" height="40px" />
          ) : (
            <img
              src={import.meta.env.VITE_API_URL + data?.photo}
              className="w-[40px] h-[40px] rounded-full"
              alt=""
            />
          )}
          {isLoading ? (
            <Skeleton width="100%" height="20px" />
          ) : (
            <div className="flex flex-col text-white">
              <h1 className="text-[18px] font-bold line-clamp-1">
                {data?.fullName}
              </h1>
              <p className="text-[14px] line-clamp-1 text-light-300">
                @{data?.username}
              </p>
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-6 h-full">
          {navbarItemsFirst.map((item) => (
            <NavLink key={item.id} to={item.path} className={"flex gap-4 p-4"}>
              <p className="text-primary_500">{item.Icon}</p>
              <p>{item.title}</p>
            </NavLink>
          ))}
          <div className="mt-[108px]">
            {navbarItemsLast.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.title === "Logout") {
                    setIsOpenModal(true);
                  }
                }}
                className={"flex gap-4 p-4 hover:bg-white/20 rounded-lg duration-300 cursor-pointer"}
              >
                <p className="text-primary_500">{item.Icon}</p>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          <Modal
            title="Log Out"
            open={isOpenModal}
            onOk={handleLogOut}
            onCancel={() => setIsOpenModal(false)}
          >
            <p className="text-center font-bold text-xl">
              Are you sure you want to log out?
            </p>
          </Modal>
        </nav>
      </div>
    </aside>
  );
}

export default Aside;
