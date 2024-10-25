import { lazy, LazyExoticComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../../utils";
import Aside from "../../components/aside/Aside";
import NotFound from "../../pages/Dashboard/notFound/NotFound";

function DashboardRoutes() {
  const Home: LazyExoticComponent<any> = lazy(
    () => import("../../pages/Dashboard/home/Home")
  );
  const UserProfile: LazyExoticComponent<any> = lazy(
    () => import("../../pages/Dashboard/usersProfile/UsersProfile")
  );
  const PostPage: LazyExoticComponent<any> = lazy(
    () => import("../../pages/Dashboard/postPage/PostPage")
  );
  const PostModal: LazyExoticComponent<any> = lazy(
    () => import("../../pages/Dashboard/postModal/PostModal")
  );
  const CreatePost: LazyExoticComponent<any> = lazy(
    () => import("../../pages/Dashboard/createPost/CreatePost")
  );
  const EditProfile: LazyExoticComponent<any> = lazy(
    () => import("../../pages/Dashboard/editProfile/EditProfile")
  );
  const People: LazyExoticComponent<any> = lazy(
    () => import("../../pages/Dashboard/people/People")
  );
  const Following: LazyExoticComponent<any> = lazy(
    () => import("../../pages/Dashboard/following/Following")
  );
  return (
    <main className="grid grid-cols-12">
      <Aside />
      <div className="col-span-10">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/people"
            element={
              <Suspense>
                <People />
              </Suspense>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <Suspense>
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path="/post-page/:id/:username"
            element={
              <Suspense>
                <PostPage />
              </Suspense>
            }
          />
          <Route
            path="/post-modal"
            element={
              <Suspense>
                <PostModal />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense>
                <CreatePost />
              </Suspense>
            }
          />
          <Route
            path="/edit/:username"
            element={
              <Suspense>
                <EditProfile />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <NotFound />
              </Suspense>
            }
          />
          <Route
            path="/following/:username"
            element={
              <Suspense>
                <Following />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </main>
  );
}

export default DashboardRoutes;
