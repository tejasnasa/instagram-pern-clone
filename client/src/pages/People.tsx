import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<any[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setPeople(response.data.responseObject);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {Array.isArray(people) && people.length > 0 ? (
        people.map((post) => (
          <div key={post.id}>
            <p>{post.username}</p>
            <p>Posted by: {post.fullname}</p>
            <Link to={`/profile/${post.id}`}>View Comments</Link>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PeoplePage;
