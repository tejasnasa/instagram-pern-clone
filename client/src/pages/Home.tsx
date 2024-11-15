import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/posts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setPosts(response.data.responseObject);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.caption}</p>
            <p>Posted by: {post.user.username}</p>
            <p>
              Posted by:{" "}
              <Link to={`/profile/${post.userid}`}>{post.user.username}</Link>
            </p>
            <p>Likes: {post.likes.length}</p>
            <Link to={`/post/${post.id}`}>View Comments</Link>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default HomePage;
