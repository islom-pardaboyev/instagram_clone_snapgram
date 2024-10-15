import { SnapgramIcon } from "../../assets/images";
import { useGetUserQuery } from "../../redux/api/users-api";

function Header() {
  const { data } = useGetUserQuery(
    JSON.parse(window.localStorage.getItem('userData') ?? '{}').username
  );
  console.log(data)
  return (
    <header className="col-span-2 px-[24px] bg-dark-200 h-screen overflow-y-auto text-white pt-[48px] pb-[32px]">
      <div className="flex flex-col gap-11">
        <SnapgramIcon/>
      </div>
    </header>
  );
}

export default Header;
