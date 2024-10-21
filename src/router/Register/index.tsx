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
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <Suspense>
          <SignUp />
        </Suspense>
      ),
    },
  ]);
};

export default RegisterRoutes;
