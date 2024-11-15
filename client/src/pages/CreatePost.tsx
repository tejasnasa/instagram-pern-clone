import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    caption: "",
    imgUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitPost = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/v1/posts`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setFormData({ caption: "", imgUrl: "" });
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
        value={formData.caption}
        onChange={handleChange}
      />
      <input
        type="text"
        name="imgUrl"
        placeholder="Image URL"
        value={formData.imgUrl}
        onChange={handleChange}
      />
      <button onClick={handleSubmitPost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
