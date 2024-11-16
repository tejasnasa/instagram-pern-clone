import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    caption: "",
    imageurl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error during post creation:", err);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input
        type="text"
        name="caption"
        placeholder="Write a caption..."
        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {formData.imageurl && <img src={formData.imageurl} alt="Uploaded Preview" />}
      <button onClick={handleSubmitPost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
