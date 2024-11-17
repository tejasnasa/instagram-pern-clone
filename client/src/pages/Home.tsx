import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";
import People from "../components/People";
import Loading from "../components/Loading";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setTimeout(async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/v1/posts`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            );
            setPosts(response.data.responseObject);
          } catch (err) {
            console.error("Error fetching posts:", err);
          } finally {
            setIsLoading(false);
          }
        }, 1000);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="bg-black text-white pl-80 pr-52 flex">
      <section className="flex flex-wrap flex-col items-center justify-center mt-5">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>No posts available.</p>
        )}
      </section>
      <People />
    </main>
  );
};

export default HomePage;
