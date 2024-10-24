import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon, SnapgramIcon } from "../../../assets/images";
import BgImage from "../../../assets/images/bg_image.png";
import { LoginUser, UserInfos } from "../../../types";
import { FormEvent, useContext } from "react";
import InputComponent from "../../../components/input/InputComponent";
import { useLoginUserMutation } from "../../../redux/api/users-api";
import { Context } from "../../../context/Context";
import { toast } from "react-toastify";

function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const context = useContext(Context);
  const navigate = useNavigate();

  const LoginInputInfo: UserInfos[] = [
    {
      id: 1,
      span_name: "user name",
      name: "username",
      type: "text",
    },
    {
      id: 2,
      span_name: "password",
      name: "password",
      type: "password",
    },
  ];

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const target = new FormData(e.target as HTMLFormElement);
    const username = target.get("username") as string;
    const password = target.get("password") as string;

    const data: LoginUser = {
      username,
      password,
    };

    try {
      window.localStorage.setItem("userData", JSON.stringify(data));
      const res = await loginUser(data).unwrap();

      window.localStorage.setItem("accessToken", res?.accessToken);
      window.localStorage.setItem("refreshToken", res?.refreshToken);
      toast.success("Welcome Back");
      context?.setToken(true);
      navigate("/");
    } catch (err: any) {
      if (Array.isArray(err.data?.message)) {
        err.data.message.forEach((msg: string) => toast.error(msg));
      } else {
        const errorMessage = err.data?.message;
        toast.error(errorMessage);
      }
    }
  }

  return (
    <section className="w-screen h-screen bg-dark-100 flex overflow-hidden">
      <div className="flex-1 h-screen overflow-y-auto flex items-center justify-center">
        <form onSubmit={handleFormSubmit} className="w-[400px] text-white">
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
              <InputComponent item={item} key={item.id} />
            ))}
          </div>
          <div className="mt-[30px] mb-[32px] flex flex-col space-y-5">
            <button
              type="submit"
              className="bg-primary_500 capitalize py-[13px] w-full rounded-lg font-semibold"
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
            <button
              type="button"
              className="py-3 w-full text-black justify-center bg-white rounded-lg font-semibold flex items-center space-x-3"
            >
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>
          </div>
          <p className="text-center text-light-200  text-sm">
            Don’t have an account?{" "}
            <Link to={"/sign-up"} className="text-primary_500 font-semibold">
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