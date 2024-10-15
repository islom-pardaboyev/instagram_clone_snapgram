import { useRoutes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../../utils";
import { lazy, LazyExoticComponent } from "react";

const Login: LazyExoticComponent<any> = lazy(
  () => import("../../pages/Register/login/Login")
);
const SignUp: LazyExoticComponent<any> = lazy(() => import("../../pages/Register/singUp/SignUp"));

const RegisterRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense>
          <SignUp />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
    },
  ]);
};

export default RegisterRoutes;
