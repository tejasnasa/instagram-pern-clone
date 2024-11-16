import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import axios from "axios";

interface PostProps {
  post: {
    id: string;
    caption: string;
    imageurl: string;
    user: {
      username: string;
      avatar: string;
    };
    userid: string;
    likes: any[];
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoggedInUserId = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/users/self`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setLoggedInUserId(response.data.responseObject.id);
      } catch (err) {
        console.error("Error fetching logged-in user ID:", err);
      }
    };

    if (!loggedInUserId) {
      fetchLoggedInUserId();
    }
  }, [loggedInUserId]);

  useEffect(() => {
    if (loggedInUserId) {
      setIsLiked(
        post.likes.some((like: any) => like.userid === loggedInUserId)
      );
    }
  }, [loggedInUserId, post.likes]);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/v1/like/unlike/${post.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/v1/like/${post.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <div key={post.id} className="w-8/12 m-5">
      <Link to={`/profile/${post.userid}`}>
        <img
          src={post.user.avatar}
          className="h-8 m-2 mr-4 rounded-full inline"
        />
        <span>{post.user.username}</span>
      </Link>
      <img
        src={post.imageurl}
        alt="Post"
        className="max-h-[600px] m-auto"
      />
      <div className="p-2">
        <span className="flex m-2">
          <FaHeart
            onClick={handleLikeToggle}
            className={`text-white cursor-pointer${
              isLiked ? "text-red-500" : ""
            }`}
          />
          <CiHeart className="mr-2 ml-2" />
          <Link to={`#`}>
            <FaRegComment />
          </Link>
        </span>

        <p className="font-semibold">{post.likes.length} likes</p>
        <p className="mb-2 mt-1">{post.caption}</p>

        <Link to={`#`} className="text-gray-400">
          View Comments
        </Link>
        <p className="text-gray-400 mt-1">Add a comment...</p>
      </div>
    </div>
  );
};

export default Post;
