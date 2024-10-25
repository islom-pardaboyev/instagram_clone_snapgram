import { useNavigate, useParams } from "react-router-dom";
import {
  useFollowMutation,
  useGetAllPostByUserQuery,
  useGetUserQuery,
  useUnfollowMutation,
  useGetCurrentUserDatasQuery,
  useGetAllUserQuery,
} from "../../../redux/api/users-api";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { EditIcon, MultiplePostIcon } from "../../../assets/images";
import NoImg from "../../../assets/images/no-image.jpg";
import { API } from "../../../hook/useEnv";
import { Post, UserProfile } from "../../../types";
import Zoom from 'react-medium-image-zoom'

function UsersProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [unfollow, { isLoading: isUnfollowLoading }] = useUnfollowMutation();
  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [currentUserInfo, setCurrentUserInfo] = useState<UserProfile | null>(null);

  const { username } = useParams<{ username: string }>();
  const { data } = useGetUserQuery(username);
  const { data: userData } = useGetCurrentUserDatasQuery(true);
  const { data: postByUser } = useGetAllPostByUserQuery(username);
  const { data: currentUserData } = useGetCurrentUserDatasQuery(true);
  const {data: allUser} = useGetAllUserQuery(3000)

  useEffect(() => {
    if (data && postByUser && userData) {
      setProfile(data);
      setPosts(postByUser);
      setCurrentUserInfo(userData);
    }
  }, [data, postByUser, userData]);

  const UserBio = (allUser?.find((item:any) => item?._id === profile?._id)?.bio === '' ? 'Dont have bio' :allUser?.find((item:any) => item?._id === profile?._id)?.bio) || currentUserData?.bio

  return (
    <section className="text-white h-screen px-4 md:px-16 lg:px-[60px] py-[20px] lg:py-[80px] overflow-y-auto bg-black">
      {profile && posts.length !== undefined ? (
        <main>
          <header className="flex flex-col md:flex-row gap-10">
            <Zoom>
            <img
              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover"
              src={profile.photo}
              onError={(e) => (e.currentTarget.src = API + profile.photo)}
              alt={profile.fullName}
            />
            </Zoom>
         
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="flex items-center gap-12">
                  <h1 className="font-semibold text-2xl line-clamp-1 md:text-4xl mb-2 md:mb-0">
                    {profile.fullName}
                  </h1>
                  {profile && currentUserInfo && profile._id !== currentUserInfo._id && (
                    <button
                      className={
                        currentUserInfo.following.some((user) => user._id === profile._id)
                          ? "unfollow-btn"
                          : "follow-btn"
                      }
                      onClick={() => {
                        if (currentUserInfo.following.some((user) => user._id === profile._id)) {
                          unfollow(profile.username);
                        } else {
                          follow(profile.username);
                        }
                      }}
                    >
                      {currentUserInfo.following.some((user) => user._id === profile._id)
                        ? isUnfollowLoading ? 'Unfollowing...' : "Unfollow"
                        : isFollowLoading ? 'Following...' : "Follow"}
                    </button>
                  )}
                </div>
                {data?._id === currentUserInfo?._id && (
                  <button
                    onClick={() => navigate(`/edit/${profile.username}`)}
                    className="bg-dark-300 cursor-pointer hover:bg-dark-400 duration-200 py-[10px] px-5 rounded-lg flex items-center gap-[7px]"
                  >
                    <EditIcon />
                    <p className="font-semibold text-sm">Edit Profile</p>
                  </button>
                )}
              </div>
              <p className="text-lg text-light-300 mt-2">@{profile.username}</p>
              <div className="mt-[22px] flex gap-10 flex-wrap">
                <div className="flex items-center gap-2">
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">{posts.length}</p>
                  <span className="text-[18px] font-medium text-light-200">Posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">{profile.followers.length}</p>
                  <span className="text-[18px] font-medium text-light-200">Followers</span>
                </div>
                <div className="flex items-center gap-2 hover:opacity-70 cursor-pointer" onClick={() => navigate(`/following/${profile.username}`)}>
                  <p className="text-[20px] text-purple font-bold tracking-[-1px]">{profile.following.length}</p>
                  <span className="text-[18px] font-medium text-light-200">Following</span>
                </div>
              </div>
              <p className="mt-[30px]">{UserBio}</p>
            </div>
          </header>

          <div className="mt-[68px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.length ? (
              posts.map((item, inx) => {
                const firstPost: string = item?.content[0]?.url;
                const firstPostType = item?.content[0]?.type ?? NoImg;
                return (
                  <div
                    onClick={() => navigate(`/post-page/${item._id}/${profile.username}`)}
                    key={inx}
                    className="rounded-2xl z-30 transition-all group overflow-hidden relative"
                  >
                    {item.content.length > 1 && (
                      <span className="absolute top-6 right-[14px] z-40">
                        <MultiplePostIcon />
                      </span>
                    )}
                    <div
                      className="absolute flex flex-col justify-end top-0 left-0 right-0 bottom-0 z-40"
                      style={{
                        background: `linear-gradient(180deg, rgba(23, 23, 23, 0) 0%, #171717 109.15%)`,
                      }}
                    >
                      <div className="p-4">
                        <h1 className="font-bold">{item.caption}</h1>
                        <h1 className="italic text-xs text-gray-500">{item.content_alt}</h1>
                      </div>
                    </div>
                    {firstPostType === "IMAGE" && (
                      <img
                        className="w-full group-hover:scale-110 duration-300 h-[200px] sm:h-[250px] lg:h-[315px] object-cover"
                        src={firstPost}
                      />
                    )}
                    {firstPostType === "VIDEO" && (
                      <video
                        className="w-full h-[200px] sm:h-[250px] lg:h-[315px] object-cover group-hover:scale-110 duration-300"
                        src={firstPost}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center col-span-12 text-3xl font-semibold opacity-70 capitalize">
                posts not available...
              </p>
            )}
          </div>
        </main>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
    </section>
  );
}

export default UsersProfile;
