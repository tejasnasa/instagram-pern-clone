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
  const [likesCount, setLikesCount] = useState(post.likes.length); // Track like count

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
      // Optimistically update the like count
      if (isLiked) {
        setLikesCount(likesCount - 1);
      } else {
        setLikesCount(likesCount + 1);
      }

      // Update the like state
      setIsLiked(!isLiked);

      // Make the API call to like/unlike
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
      // Revert the optimistic update in case of an error
      setLikesCount(isLiked ? likesCount + 1 : likesCount - 1);
      setIsLiked(isLiked); // Revert the like state
    }
  };

  return (
    <div key={post.id} className="w-8/12 m-5">
      <Link to={`/profile/${post.userid}`}>
        <img
          src={post.user.avatar}
          className="h-8 mt-2 mb-3 mr-4 rounded-full inline"
        />
        <span className="pb-2">{post.user.username}</span>
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
        <p className="mb-2 mt-1">{post.caption}</p>
        <Link to={`/post/${post.id}`} className="text-gray-400">
          View Comments
        </Link>
        <p className="text-gray-400 mt-1">Add a comment...</p>
      </div>
      <hr className="h-[0.5px] mt-4 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
};

export default Post;
