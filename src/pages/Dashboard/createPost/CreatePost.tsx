import { FormEvent, useState } from "react";
import {
  CreatePostIcon,
  FileIcon,
  ImportFilesIcon,
  LocationIcon,
} from "../../../assets/images";
import {
  useCreatePostMutation,
  useUploadFilesMutation,
} from "../../../redux/api/users-api";
import { useNavigate } from "react-router-dom";
import { imageFileTypes } from "../home/Home";
import { toast } from "react-toastify";

function CreatePost() {
  const navigate = useNavigate();
  const [uploadFiles, { isLoading }] = useUploadFilesMutation();
  const [createPost, { isLoading: isLoadingPost }] = useCreatePostMutation();
  const [imagesOrVideos, setImagesOrVideos] = useState<File[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [saveImages, setSaveImages] = useState<any>([]);

  function handleUpload() {
    const formData = new FormData();
    imagesOrVideos.forEach((img) => {
      formData.append("files", img, img.name);
    });

    uploadFiles(formData)
      .unwrap()
      .then((res) => {
        const urls = res.files.flat().map((item: { url: string }) => item.url);
        toast.success('Successfully uploaded');
        const content = urls.map((url: string) => {
          const isImage = imageFileTypes.some((type: string) =>
            url.includes(type)
          );
          const type = isImage ? "IMAGE" : "VIDEO";
          return { url, type };
        });

        setSaveImages(content);
      });
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      content: saveImages,
      location,
      content_alt: altText,
      caption,
    };
    createPost(data)
      .unwrap().then(() => {
        navigate('/');
      });
  }

  return (
    <section className="w-full h-screen overflow-y-auto py-8 px-4 sm:px-8 md:px-16 lg:px-32 bg-black text-white">
      <div className="flex items-center gap-4 mb-10">
        <span className="scale-150">
          <CreatePostIcon />
        </span>
        <p className="text-3xl md:text-4xl font-bold">Create a Post</p>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="font-medium text-lg">Caption</span>
          <textarea
            required
            rows={4}
            name="caption"
            className="bg-dark-300 resize-none p-4 outline-none"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </label>
        <label className="flex flex-col gap-2 relative">
          <span className="font-medium text-lg">Add Photos/Videos</span>
          {imagesOrVideos.length ? (
            <div className="bg-dark-300 w-full flex-wrap flex gap-3 p-5 md:p-10">
              {imagesOrVideos.map((i, inx) => {
                const mediaUrl = URL.createObjectURL(i);
                return (
                  <div className="relative" key={inx}>
                    {i.type.includes("video") ? (
                      <video
                        src={mediaUrl}
                        controls
                        className="w-full h-auto max-w-[300px] object-contain"
                      />
                    ) : (
                      <img
                        className="w-full h-auto max-w-[300px] object-contain"
                        src={mediaUrl}
                        alt={`media-${inx}`}
                      />
                    )}
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white p-2"
                      onClick={() =>
                        setImagesOrVideos(
                          imagesOrVideos.filter((_, index) => index !== inx)
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <div className="absolute right-3 bottom-3 flex items-center space-x-5">
                <button
                  type="button"
                  className="font-semibold py-2 px-4 bg-purple rounded-lg"
                  onClick={handleUpload}
                >
                  {isLoading ? "Uploading..." : "Upload"}
                </button>
                <label htmlFor="chooseFile" className="cursor-pointer">
                  <input
                    onChange={(e) =>
                      setImagesOrVideos((prev) => [
                        ...prev,
                        ...Array.from(e.target.files || []).filter(
                          (file) => !prev.includes(file)
                        ),
                      ])
                    }
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                  <span className="font-semibold py-2 px-4 bg-purple rounded-lg">
                    Choose another one
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-dark-300 py-12 relative">
              <div className="flex flex-col items-center justify-center">
                <ImportFilesIcon />
                <h1 className="text-lg font-semibold mt-3 mb-2">
                  Drag photos and videos here
                </h1>
                <p className="text-xs text-light-400">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
                <label htmlFor="chooseFile" className="mt-4 cursor-pointer">
                  <span className="text-xs font-semibold py-2 px-4 rounded-lg bg-dark-400">
                    Select from computer
                  </span>
                  <input
                    onChange={(e) =>
                      setImagesOrVideos(Array.from(e.target.files || []))
                    }
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                </label>
              </div>
              <span className="absolute right-6 flex items-center justify-center bottom-6 bg-dark-400">
                <FileIcon />
              </span>
            </div>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-medium text-lg">Add Location</span>
          <div className="bg-dark-300 flex items-center p-2 justify-between">
            <input
              name="location"
              required
              className="outline-none bg-transparent w-full p-2"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <LocationIcon />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-medium text-lg">Photo/Video Alt Text</span>
          <input
            name="content_alt"
            required
            className="bg-dark-300 p-4 outline-none"
            placeholder="Alt text for accessibility"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className={`font-semibold py-3 px-4 bg-purple rounded-lg ml-auto ${
            isLoadingPost ? "opacity-80" : "opacity-100"
          }`}
        >
          {isLoadingPost ? "Sharing post..." : "Share post"}
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
