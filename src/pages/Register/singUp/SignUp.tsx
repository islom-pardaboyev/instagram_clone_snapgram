import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon } from "../../../assets/images";
import BgImage from "../../../assets/images/bg_image.png";
import { CreateNewUser, UserInfos } from "../../../types";
import { FormEvent } from "react";
import InputComponent from "../../../components/input/InputComponent";
import { useCreateUserMutation } from "../../../redux/api/users-api";

function SignUp() {
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const SignUpInputsInfo: UserInfos[] = [
    {
      id: 1,
      span_name: "name",
      name: "full_name",
      type: "text",
    },
    {
      id: 2,
      span_name: "email",
      name: "email",
      type: "email",
    },
    {
      id: 3,
      span_name: "user Name",
      name: "username",
      type: "text",
    },
    {
      id: 4,
      span_name: "password",
      name: "password",
      type: "password",
    },
  ];

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const target = new FormData(e.target as HTMLFormElement);
    const full_name = target.get("full_name") as string;
    const email = target.get("email") as string;
    const username = target.get("username") as string;
    const password = target.get("password") as string;
    const data: CreateNewUser = {
      full_name,
      email,
      username,
      password,
    };

    createUser(data).then(() => {
      navigate("/login");
    });
  }

  return (
    <section className="w-screen h-screen bg-dark-100 flex overflow-hidden">
      <div className="flex-1 h-screen overflow-y-auto flex items-center justify-center">
        <form onSubmit={handleFormSubmit} className="w-[400px] text-white">
          <div className="text-center space-y-[12px] mb-[32px]">
            <h1 className="font-bold text-3xl">Create a new account</h1>
            <p className="text-light-300">
              To use snapgram, Please enter your details.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {SignUpInputsInfo.map((item: UserInfos) => (
              <InputComponent item={item} key={item.id} />
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
            <Link to={"/login"} className="text-primary_500 font-semibold">
              Log in
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

export default SignUp;
