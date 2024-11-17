import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const People: React.FC = () => {
  const [people, setPeople] = useState<any[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<{
    id: string;
    avatar: string;
    username: string;
    fullname: string;
  } | null>(null);

  useEffect(() => {
    const fetchLoggedInUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/v1/users/self`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setLoggedInUser(response.data.responseObject);
      } catch (err) {
        console.error("Error fetching logged-in user details:", err);
      }
    };

    if (!loggedInUser) {
      fetchLoggedInUserDetails();
    }

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
  }, [loggedInUser]);

  const filteredPeople = people.filter(
    (person) => person.id !== loggedInUser?.id
  );

  return (
    <div>
      <div>
        {loggedInUser?.avatar && (
          <Link
            to={`profile/${loggedInUser.id}`}
            className="flex items-center mt-8 text-md font-medium"
          >
            <img
              src={loggedInUser.avatar}
              alt="Profile"
              className="h-[42px] w-[42px] rounded-full m-2 mr-4"
            />
            <div className="flex flex-col ">
              <span className="text-sm font-semibold">
                {loggedInUser.username}
              </span>
              <span className="text-sm text-gray-400">{loggedInUser.fullname}</span>
            </div>
          </Link>
        )}
      </div>

      <section>
        <h5 className="pt-8 mb-2 text-gray-300 text-md font-semibold">
          Suggested for you
        </h5>
        {Array.isArray(people) && people.length > 0 ? (
          filteredPeople.map((people) => (
            <Link
              key={people.id}
              to={`profile/${people.id}`}
              className="flex items-center text-md font-medium"
            >
              <img
                src={people.avatar}
                alt="Profile"
                className="h-[42px] w-[42px] rounded-full m-2 mr-4"
              />
              <div className="flex flex-col ">
                <span className="text-sm font-semibold">
                  {people.username}
                </span>
                <span className="text-xs text-gray-300">Suggested for you</span>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </section>
    </div>
  );
};

export default People;
