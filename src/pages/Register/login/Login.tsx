import { Link } from "react-router-dom";
import { GoogleIcon, SnapgramIcon } from "../../../assets/images";
import BgImage from "../../../assets/images/bg_image.png";
import { UserInfos } from "../../../types";
import { FormEvent } from "react";
import InputComponent from '../../../components/input/InputComponent'

function Login() {
  const LoginInputInfo: UserInfos[] = [
    {
      id: 1,
      span_name: "email",
      name: "email",
      type: "email",
    },
    {
      id: 2,
      span_name: "password",
      name: "password",
      type: "password",
    },
  ];

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <section className="w-screen h-screen bg-dark-100 flex overflow-hidden">
      <div className="flex-1 flex items-center justify-center">
        <form onClick={handleFormSubmit} className="w-[400px] text-white">
          <span className="flex items-center justify-center mb-[68px]">
            <SnapgramIcon />
          </span>
          <div className="text-center space-y-[12px] mb-[32px]">
            <h1 className="font-bold text-3xl">Log in to your account</h1>
            <p className="text-light-300">
            Welcome back! Please enter your details.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {LoginInputInfo.map((item: UserInfos) => (
              <InputComponent item={item} key={item.id}/>
            ))}
          </div>
          <div className="mt-[30px] mb-[32px] flex flex-col space-y-5">
            <button
              type="submit"
              className="bg-primary_500 capitalize py-[13px] w-full rounded-lg font-semibold"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="py-3 w-full text-black justify-center bg-white rounded-lg font-semibold flex items-center space-x-3"
            >
              <GoogleIcon />
              <span>Sign up with Google</span>
            </button>
          </div>
          <p className="text-center text-light-200  text-sm">
            Don’t have an account?{" "}
            <Link to={"/"} className="text-primary_500 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <div className="flex-1">
        <img src={BgImage} className="w-full h-full object-cover" alt="" />
      </div>
    </section>
  );
}

export default Login;
