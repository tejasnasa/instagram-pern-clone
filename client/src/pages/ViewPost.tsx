import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

interface Post {
  id: string;
  caption: string;
  imageurl: string;
  user: {
    username: string;
    avatar: string;
  };
  userid: string;
  likes: any[];
}

const PostDetails: React.FC = () => {
  const { postid } = useParams<{ postid: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/posts/${postid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const postData = response.data.responseObject;
        setPost(postData);
      } catch (err) {
        console.error("Error fetching post details:", err);
      }
    };
    fetchPostDetails();
  }, [postid]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-black text-white pl-[250px] pr-32 min-h-dvh w-dvw">
      <Post key={post.id} post={post} />
    </main>
  );
};

export default PostDetails;
