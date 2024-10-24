import { FormEvent } from "react";
import {
  CommentIcon,
  LikedIcon,
  LikeIcon,
  SavedIconPost,
  SendIcon,
  ShareIcon,
} from "../../assets/images";
import { formatDate } from "../../pages/Dashboard/home/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import {
  useGetCurrentUserDatasQuery,
  useLikePostMutation,
  usePostCommentMutation,
} from "../../redux/api/users-api";
import { API } from "../../hook/useEnv";
import { useNavigate } from "react-router-dom";

function PostCard({ post }: { post: any }) {
  const navigate = useNavigate()
  const [postComment] = usePostCommentMutation();
  const [likePost, {isLoading}] = useLikePostMutation();
  const { data: currentUserData } = useGetCurrentUserDatasQuery(true);
  const sendComment = (e: FormEvent, postId: string) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const commentInput = target.elements.namedItem(
      "comment"
    ) as HTMLInputElement;
    const message = commentInput.value;

    if (message) {
      const data = {
        postId,
        body: { message },
      };

      postComment(data)
        .unwrap()
        .then((_res) => target.reset());
    }
  };
console.log(post)
  return (
    <div className="px-[29px] py-[36px] border bg-dark-200 rounded-[30px] border-dark-400">
      <header className="mb-[40px] ">
        <div className="flex gap-[10px]">
          <img
            className="size-[50px] rounded-full object-cover"
            src={post.owner.photo}
            onError={(e) => (e.currentTarget.src = API + post.owner.photo)}
            alt="Post owner"
          />
          <div className="mb-[20px] flex flex-col">
            <h1 className="text-[18px] font-semibold">{post.owner.username}</h1>
            <p className="text-[14px] text-light-300 font-bold">
              {formatDate(post?.createdAt)}
            </p>
          </div>
        </div>
        <p className="font-semibold">{post?.content_alt}</p>
      </header>
      <Swiper onClick={() => navigate(`/post-page/${post._id}/${post.owner.username}`)} navigation={true} spaceBetween={10} modules={[Navigation]}>
        {post.content &&
          post.content?.map((content: any, contentIndex: number) => {
            if (content?.type === "VIDEO") {
              return (
                <SwiperSlide key={contentIndex}>
                  <video
                    controls
                    className="w-full h-[500px] object-contain"
                    src={content?.url}
                  ></video>
                </SwiperSlide>
              );
            }
            if (content?.type === "IMAGE") {
              return (
                <SwiperSlide key={contentIndex}>
                  <img
                    className="w-full h-[500px] object-contain"
                    src={content?.url}
                  />
                </SwiperSlide>
              );
            }
          })}
      </Swiper>
      {/* actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[30px]">
          <p className="flex items-center gap-[6px]">
            <span
              className="text-purple cursor-pointer"
              onClick={() => likePost(post._id)}
            >
              {post.likes?.some(
                (item: string) => item === currentUserData?._id
              ) ? (
                isLoading ? 'Loading...' :
                <LikedIcon />
              ) : (
                isLoading ? 'Loading...' :
                <LikeIcon />
              )}
            </span>
            <span className="font-semibold text-sm">{post.likes?.length}</span>
          </p>
          <p className="flex items-center gap-[6px]">
            <span className="text-purple cursor-pointer">
              <CommentIcon />
            </span>
            <span className="font-semibold text-sm">
              {post.comments?.length}
            </span>
          </p>
          <p className="flex items-center gap-[6px]">
            <span className="text-purple cursor-pointer">
              <ShareIcon />
            </span>
            <span className="font-semibold text-sm">{post.shares_count}</span>
          </p>
        </div>
        <span className="text-purple">
          <SavedIconPost />
        </span>
      </div>
      <form
        onSubmit={(e) => sendComment(e, post._id)}
        className="flex items-center mt-[40px] gap-[11px]"
      >
        <img
          className="size-[40px] rounded-full object-cover"
          src={currentUserData?.photo}
          onError={(e) => (e.currentTarget.src = API + currentUserData?.photo)}
          alt=""
        />
        <div className="relative bg-dark-300 w-full py-[11px] px-4">
          <input
            name="comment"
            type="text"
            placeholder="Write your comment..."
            className="w-full outline-none bg-transparent placeholder:text-light-300"
          />
          <button className="absolute right-4" type="submit">
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCard;
