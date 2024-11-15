import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Post {
  id: string;
  caption: string;
  imgUrl: string;
  likes: Array<{ userid: string }>;
}

const PostDetails: React.FC = () => {
  const { postid } = useParams<{ postid: string }>();
  const [post, setPost] = useState<Post | null>(null);
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

        if (loggedInUserId) {
          setIsLiked(
            postData.likes.some((like: any) => like.userid === loggedInUserId)
          );
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
      }
    };

    if (!loggedInUserId) {
      fetchLoggedInUserId();
    }

    if (loggedInUserId) {
      fetchPostDetails();
    }
  }, [postid, loggedInUserId]);

  const handleLikeToggle = async () => {
    try {
      isLiked
        ? await axios.post(
            `${import.meta.env.VITE_BASE_URL}/v1/like/unlike/${postid}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
        : await axios.post(
            `${import.meta.env.VITE_BASE_URL}/v1/like/${postid}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
      setIsLiked(!isLiked);

      setPost((prevPost) => {
        if (!prevPost) return prevPost;
        const updatedLikes = isLiked
          ? prevPost.likes.filter((like) => like.userid !== loggedInUserId)
          : [...prevPost.likes, { userid: loggedInUserId as string }];
        return { ...prevPost, likes: updatedLikes };
      });
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  if (!post || !loggedInUserId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Post Details</h2>
      <img src={post.imgUrl} alt="Post" style={{ maxWidth: "100%" }} />
      <p>{post.caption}</p>
      <p>Likes: {post.likes.length}</p>
      <button onClick={handleLikeToggle}>{isLiked ? "Unlike" : "Like"}</button>
    </div>
  );
};

export default PostDetails;
