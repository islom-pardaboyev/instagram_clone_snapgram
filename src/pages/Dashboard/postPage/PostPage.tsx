import { useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetAllCommentPostQuery,
  useGetAllUserQuery,
  useGetCurrentUserDatasQuery,
  useGetSinglePostQuery,
  useGetUserQuery,
  useLikePostMutation,
  usePostCommentMutation,
} from "../../../redux/api/users-api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import {
  CommentIcon,
  DeleteIcon,
  EditIcon,
  LikedIcon,
  LikeIcon,
  ReplyIcon,
  SendIconYellow,
  ShareIcon,
} from "../../../assets/images";
import { API } from "../../../hook/useEnv";
import { formatDate } from "../home/Home";
import { ThreeDots } from "react-loader-spinner";
import { FormEvent } from "react";

function PostPage() {
  function timeAgo(dateString: string) {
    const date: any = new Date(dateString);
    const now: any = new Date();

    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return weeks === 1 ? "1w" : `${weeks}w`;
    } else if (days > 0) {
      return days === 1 ? "1d" : `${days}d`;
    } else if (hours > 0) {
      return hours === 1 ? "1h" : `${hours}h`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1m" : `${minutes}m`;
    } else {
      return "Just now";
    }
  }
  const [deletePost] = useDeletePostMutation();
  const [postComment] = usePostCommentMutation()
  const [likePost] = useLikePostMutation();
  const { username, id } = useParams();
  const { data: postOwner }: any = useGetUserQuery(username);
  const { data: currentUser } = useGetCurrentUserDatasQuery(true);
  const { data: allUser } = useGetAllUserQuery(3000);
  const { data: singlePost }: any = useGetSinglePostQuery({
    username: username ?? "",
    post_id: id ?? "",
  });
  const { data: comment } = useGetAllCommentPostQuery(true);
  const commentPost = comment?.filter((item: any) => item.which_post === id);
  const sendComment = (e:FormEvent, postId:string) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const message = (target.elements.namedItem('comment') as HTMLInputElement).value
    if(message) {
      const data = {
        postId,
        body: {message}
      };

        postComment(data).unwrap().then(() => target.reset())
    }
  }
  return (
    <section className="h-screen overflow-y-auto text-white bg-black px-[31px] py-[80px]">
      {singlePost ? (
        <div className="grid grid-cols-12 rounded-[30px] overflow-hidden bg-dark-200">
          <div className="col-span-5 h-[582px]">
            <Swiper
              navigation={true}
              spaceBetween={10}
              className="h-full"
              modules={[Navigation]}
            >
              {singlePost.content.map((item: any, inx: number) => {
                if (item.type === "VIDEO") {
                  return (
                    <SwiperSlide
                      key={inx}
                    >
                      <video
                        className="m-auto w-full object-cover"
                        src={item.url}
                        controls
                      />
                    </SwiperSlide>
                  );
                } else if (item.type === "IMAGE") {
                  return (
                    <SwiperSlide key={inx} className="flex items-center justify-center">
                      <img
                        className="w-full object-cover"
                        src={item.url}
                        alt={`Image ${inx}`}
                      />
                    </SwiperSlide>
                  );
                }
                return null;
              })}
            </Swiper>
          </div>
          <div className="col-span-7 bg-dark-200 relative py-9 px-7">
            <header className="flex mb-5 justify-between items-start">
              <div className="flex items-center gap-3">
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover"
                  src={postOwner?.photo}
                  onError={(e) => (e.currentTarget.src = API + postOwner.photo)}
                  alt="Post Owner"
                />
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">
                    {postOwner.fullName}
                  </h1>
                  <p className="text-light-300 font-medium text-sm">
                    {formatDate(singlePost.createdAt)}
                  </p>
                </div>
              </div>
              {postOwner?._id === currentUser?._id ? (
                <div className="flex items-center gap-3">
                  <button>
                    <EditIcon />
                  </button>
                  <button onClick={() => deletePost(singlePost._id)}>
                    <DeleteIcon />
                  </button>
                </div>
              ) : null}
            </header>

            <p className="font-semibold">{singlePost?.caption}</p>
            <span className="block w-full h-px bg-dark-400 my-6"></span>

            <div className="flex flex-col gap-6 overflow-y-auto max-h-60">
              {commentPost?.length ? (
                commentPost.map((comment: any, inx: number) => {
                  const userInfo =
                    allUser?.find((item: any) => item._id === comment.owner) ||
                    currentUser;

                  return (
                    <div key={inx} className="flex items-start gap-2">
                      <img
                        className="w-[32px] h-[32px] rounded-full object-cover"
                        src={userInfo?.photo}
                        onError={(e) =>
                          (e.currentTarget.src = API + userInfo?.photo)
                        }
                        alt="Comment Owner"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between w-full">
                          <div className="flex items-start gap-[10px]">
                            <div className="flex flex-col gap-1">
                              <h1 className="text-light-300 text-sm font-semibold">
                                {userInfo?.fullName}
                              </h1>

                              <div className="flex items-center gap-2">
                                <p className="text-light-300 font-medium text-xs">
                                  {timeAgo(comment?.createdAt)}
                                </p>
                                <p className="flex items-center gap-1 cursor-pointer">
                                  <ReplyIcon />
                                  <span className="capitalize text-light-200 font-medium text-xs">
                                    reply
                                  </span>
                                </p>
                              </div>
                            </div>
                            <p className="text-xs font-medium">
                              {comment.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <button className="text-purple">
                              <LikeIcon />
                            </button>
                            <p className="text-light-300 text-xs">
                              {comment.likes_count > 1
                                ? `${comment.likes_count} likes`
                                : `${comment.likes_count} like`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1 className="capitalize">no comment</h1>
              )}
            </div>

            <div className="absolute bottom-0 bg-dark-200 left-0 w-full flex flex-col gap-10 items-start py-4 px-5">
              <div className="flex items-center gap-[30px]">
                <div className="flex items-center gap-[6px]">
                  <button
                    onClick={() => likePost(singlePost._id)}
                    className="text-purple"
                  >
                    {singlePost.likes?.some(
                      (item: string) => item === currentUser._id
                    ) ? (
                      <LikedIcon />
                    ) : (
                      <LikeIcon />
                    )}
                  </button>
                  <span className="text-sm font-medium">
                    {singlePost.likes?.length}
                  </span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <button className="text-purple">
                    <CommentIcon />
                  </button>
                  <span className="text-sm font-medium">
                    {commentPost?.length}
                  </span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <button className="text-purple">
                    <ShareIcon />
                  </button>
                  <span className="text-sm font-medium">
                    {singlePost.shares_count}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-[11px] w-full">
                <img
                  className="size-10 rounded-full object-cover"
                  src={currentUser.photo}
                  onError={(e) =>
                    (e.currentTarget.src = API + currentUser.photo)
                  }
                  alt=""
                />
                <form onSubmit={(e) => sendComment(e, singlePost._id)} className="flex items-center w-full rounded-lg bg-dark-300 py-[11px] px-4 overflow-hidden">
                  <input
                    type="text" required name="comment"
                    className=" placeholder:text-light-400 bg-transparent w-full outline-none"
                    placeholder="Write your comment..."
                  />
                  <button>
                  <SendIconYellow/>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center ">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </section>
  );
}

export default PostPage;
