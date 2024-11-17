import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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
  const [likesCount, setLikesCount] = useState(post.likes.length);

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
        setLikesCount(likesCount - 1);
      } else {
        setLikesCount(likesCount + 1);
      }

      setIsLiked(!isLiked);

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
    } catch (err) {
      console.error("Error toggling like:", err);
      setLikesCount(isLiked ? likesCount + 1 : likesCount - 1);
      setIsLiked(isLiked);
    }
  };

  return (
    <div key={post.id} className="w-8/12 mr-5 ml-5 mb-5 mt-1">
      <Link to={`/profile/${post.userid}`}>
        <img
          src={post.user.avatar}
          className="h-8 mt-2 mb-3 mr-3 rounded-full inline"
        />
        <span className="pb-2 text-sm font-semibold">{post.user.username}</span>
      </Link>
      <img src={post.imageurl} alt="Post" className="max-h-[600px] m-auto" />
      <div className="pt-4">
        <span className="flex">
          {isLiked ? (
            <FaHeart
              size={25}
              onClick={handleLikeToggle}
              className="text-[#FF3040] cursor-pointer"
            />
          ) : (
            <FaRegHeart
              size={25}
              onClick={handleLikeToggle}
              className="text-white cursor-pointer"
            />
          )}
          <Link to={`/post/${post.id}`}>
            <FaRegComment size={25} className="ml-4" />
          </Link>
        </span>
        <p className="font-semibold mt-1">{likesCount} likes</p>{" "}
        <p className="mb-1 mt-1 text-sm"><span className="font-semibold">{post.user.username}</span>&nbsp;{post.caption}</p>
        <Link to={`/post/${post.id}`} className="text-gray-400 text-sm">
          View Comments
        </Link>
        <p className="text-gray-400 text-sm">Add a comment...</p>
      </div>
      <hr className="h-[1px] mt-5 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};

export default Post;
