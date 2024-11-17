import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    caption: "",
    imageurl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "xs7v2usy");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvhykaekv/image/upload",
        formData
      );
      setFormData((prevData) => ({
        ...prevData,
        imageurl: response.data.secure_url,
      }));
      setUploading(false);
    } catch (err) {
      console.error("Error uploading image:", err);
      setUploading(false);
    }
  };

  const handleSubmitPost = async () => {
    if (!formData.imageurl) {
      alert("Please upload an image first.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/posts`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Error during post creation:", err);
    }
  };

  return (
    <main className="bg-black text-white pl-[250px] pr-48 min-h-dvh w-dvw flex flex-col items-center ">
      <h1 className="text-4xl pt-20 pb-8">CREATE POST</h1>
      <div className="h-[82px] w-[802px] bg-gray-700 flex justify-center items-center mb-8 ">
        <textarea
          name="caption"
          placeholder="Write a caption..."
          onChange={(e) =>
            setFormData({ ...formData, caption: e.target.value })
          }
          className="bg-black border-1 border-solid border-white h-20 w-[800px] flex align-middle resize-none p-3"
        />
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {formData.imageurl && (
        <img src={formData.imageurl} alt="Uploaded Preview" />
      )}
      <button
        onClick={handleSubmitPost}
        className="h-12 w-32 p-2 mt-8 border-2 border-gray-700 border-solid hover:bg-gray-700 hover:text-black"
      >
        Create Post
      </button>
    </main>
  );
};

export default CreatePost;
