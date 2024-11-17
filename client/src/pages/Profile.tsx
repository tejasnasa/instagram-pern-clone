import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SlOptions } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import Loading from "../components/Loading";

interface UserProfile {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  bio: string;
  posts: Array<any>;
  followers: Array<{ id: string }>;
  following: Array<{ id: string }>;
}

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/users/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const profile = response.data.responseObject;
        setUserProfile(profile);

        if (loggedInUserId) {
          const isUserFollowing = profile.followers.some(
            (followingUser: any) => followingUser.id === loggedInUserId
          );
          setIsFollowing(isUserFollowing);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const initialize = async () => {
      setIsLoading(true);
      if (!loggedInUserId) {
        await fetchLoggedInUserId();
      }
      if (id) {
        await fetchUserProfile();
      }
    };

    initialize();
  }, [id, loggedInUserId]);

  const handleFollowToggle = async () => {
    try {
      const endpoint = isFollowing
        ? `${import.meta.env.VITE_BASE_URL}/v1/users/unfollow/${id}`
        : `${import.meta.env.VITE_BASE_URL}/v1/users/follow/${id}`;
      await axios.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };

  const LoadingScreen = () => <Loading />;

  useEffect(() => {
    if (userProfile) {
      document.title = `${userProfile.username} - Profile`;
    }
  }, [userProfile]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!userProfile || !loggedInUserId) {
    return <div>No profile found.</div>;
  }

  const isSelf = loggedInUserId === userProfile.id;

  return (
    <main className="bg-black text-white pl-[250px] pr-48 min-h-dvh w-dvw">
      <section className="flex ml-12">
        <img
          src={userProfile.avatar || "default-avatar.png"}
          alt="Avatar"
          className="h-40 rounded-full m-12"
        />

        <div className="m-10 ml-16">
          <div className="flex mb-6 items-center">
            <h1 className="text-xl mr-5">{userProfile.username}</h1>
            {!isSelf && (
              <button
                onClick={handleFollowToggle}
                className="bg-[#1877F2] pt-1 pb-1 pr-5 pl-5 mr-5 rounded-lg text-center justify-center"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
            <SlOptions />
          </div>
          <div className="mb-6">
            <span className="m-4 ml-0">{userProfile.posts.length} posts</span>
            <span className="m-4">
              {userProfile.followers.length} followers
            </span>
            <span className="m-4">
              {userProfile.following.length} following
            </span>
          </div>
          <div>
            <h5>{userProfile.fullname}</h5>
            <p>{userProfile.bio}</p>
          </div>
        </div>
      </section>
      <hr />
      <br />
      <br />
      <section>
        <div className="grid grid-cols-3 gap-1">
          {userProfile.posts.length > 0 ? (
            userProfile.posts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="relative aspect-square bg-black overflow-hidden"
              >
                <img
                  src={post.imageurl}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white opacity-0 hover:opacity-100 transition-opacity">
                  <div className="flex">
                    <span className="flex items-center text-xl font-bold m-4">
                      <FaHeart />
                      &nbsp;{post.likes.length}
                    </span>
                    <span className="flex items-center text-xl font-bold m-4">
                      <BiSolidMessageRounded />
                      &nbsp;{post.comments.length}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
