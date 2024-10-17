import { FormEvent, useState } from "react";
import {
  CreatePostIcon,
  FileIcon,
  ImportFilesIcon,
  LocationIcon,
} from "../../../assets/images";
import { useCreatePostMutation } from "../../../redux/api/users-api";

function CreatePost() {
  const [createPost] = useCreatePostMutation()
  const [imagesOrVideos, setImagesOrVideos] = useState<File[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [altText, setAltText] = useState<string>("");

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("content_alt", altText);
  
    imagesOrVideos.forEach((file) => {
      formData.append(`content`, file);
    });
    console.log(imagesOrVideos)
  
    createPost(formData);
  }

  return (
    <section className="w-full h-screen overflow-y-auto py-[80px] px-[60px] bg-black text-white">
      <div className="flex items-center gap-[20px] mb-[50px]">
        <span className="scale-150">
          <CreatePostIcon />
        </span>
        <p className="text-4xl font-bold">Create a Post</p>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-9">
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Caption</span>
          <textarea required
            rows={4}
            className="bg-dark-300 resize-none p-4 outline-none"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
          ></textarea>
        </label>
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Add Photos/Videos</span>
          {imagesOrVideos.length ? (
            <div className="bg-dark-300  flex gap-3 p-10">
              {imagesOrVideos.map((item, index) => {
                if (item.type.includes("image")) {
                  return (
                    <img
                      key={index}
                      width={200}
                      src={URL.createObjectURL(item)}
                      alt={`Uploaded image ${index}`}
                      className="mb-4 object-contain"
                    />
                  );
                } else if (item.type.includes("video")) {
                  return (
                    <video key={index} controls className="mb-4">
                      <source
                        src={URL.createObjectURL(item)}
                        type={item.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div className="bg-dark-300 py-[48px] relative">
              <div className="flex flex-col items-center justify-center">
                <ImportFilesIcon />
                <h1 className="text-lg font-semibold mt-3 mb-2">
                  Drag photos and videos here
                </h1>
                <p className="text-xs text-light-400">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
                <label htmlFor="chooseFile" className="mt-4 cursor-pointer">
                  <span className="text-xs font-semibold py-[10px] px-[20px] rounded-lg bg-dark-400">
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
              <span className="absolute right-[26px] size-12 flex items-center justify-center bottom-[26px] bg-dark-400">
                <FileIcon />
              </span>
            </div>
          )}
        </label>
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Add Location</span>
          <div className="bg-dark-300 flex items-center p-2 justify-between">
            <input required
              className="outline-none bg-transparent w-full p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
            <LocationIcon />
          </div>
        </label>
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Photo/Video Alt Text</span>
          <input required
            className="bg-dark-300 p-4 outline-none"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Alt text for accessibility"
          />
        </label>
        <button
          type="submit"
          className="font-semibold py-3 px-[20px] bg-purple w-fit ml-auto rounded-lg"
        >
          Share Post
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
