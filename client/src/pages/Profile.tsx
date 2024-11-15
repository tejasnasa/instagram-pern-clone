import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  email: string;
  posts: Array<any>;
  followers: Array<{ id: string }>;
  following: Array<{ id: string }>;
}

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

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

        // Once logged-in user ID and profile are fetched, check follow status
        if (loggedInUserId) {
          const isUserFollowing = profile.followers.some(
            (followingUser: any) => followingUser.id === loggedInUserId
          );
          setIsFollowing(isUserFollowing);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (!loggedInUserId) {
      fetchLoggedInUserId();
    }

    if (loggedInUserId && id) {
      fetchUserProfile();
    }
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

  if (!userProfile || !loggedInUserId) {
    return <div>Loading...</div>;
  }

  const isSelf = loggedInUserId === userProfile.id;

  return (
    <div>
      <h2>{userProfile.username}'s Profile</h2>
      <div>
        <img src={userProfile.avatar || "default-avatar.png"} alt="Avatar" />
        <p>Email: {userProfile.email}</p>
      </div>
      {!isSelf && (
        <button onClick={handleFollowToggle}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
      <h3>Posts</h3>
      <div>
        {userProfile.posts.length > 0 ? (
          userProfile.posts.map((post) => (
            <div key={post.id}>
              <p>{post.caption}</p>
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
