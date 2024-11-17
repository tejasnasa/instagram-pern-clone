import axios from "axios";
import { useEffect, useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import { MdHomeFilled, MdOutlineExplore } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { Link } from "react-router-dom"; 

interface NavbarProps {
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  const [loggedInUser, setLoggedInUser] = useState<{
    id: string;
    avatar: string;
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
        setLoggedInUser({
          id: response.data.responseObject.id,
          avatar: response.data.responseObject.avatar,
        });
      } catch (err) {
        console.error("Error fetching logged-in user details:", err);
      }
    };

    if (!loggedInUser) {
      fetchLoggedInUserDetails();
    }
  }, [loggedInUser]);

  return (
    <div className="pt-6 w-64 bg-black text-white flex flex-col justify-between h-lvh fixed">
      <div>
        <img
          src="/images/login2.png"
          alt="instagram"
          className="h-14 flex flex-col justify-between"
        />
        <ul className="">
          <li>
            <Link
              to={"/"}
              className="flex items-center m-3 text-md font-medium"
            >
              <MdHomeFilled size={30} className="m-2 mr-4" />
              Home
            </Link>
          </li>
          <li>
            <a href="#" className="flex items-center m-3 text-md font-medium">
              <CiSearch size={30} className="m-2 mr-4" />
              Search
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center m-3 text-md font-medium">
              <MdOutlineExplore size={30} className="m-2 mr-4" />
              Explore
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center m-3 text-md font-medium">
              <BiMoviePlay size={30} className="m-2 mr-4" />
              Reels
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center m-3 text-md font-medium">
              <RiMessengerLine size={30} className="m-2 mr-4" />
              Messages
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center m-3 text-md font-medium">
              <FaRegHeart size={25} className="m-2 mr-4" />
              Notifications
            </a>
          </li>
          <li>
            <Link
              to={"/create"}
              className="flex items-center m-3 text-md font-medium"
            >
              <FiPlusSquare size={30} className="m-2 mr-4" />
              Create
            </Link>
          </li>
          <li>
            {loggedInUser?.avatar && (
              <Link
                to={`profile/${loggedInUser.id}`}
                className="flex items-center m-3 text-md font-medium"
              >
                <img
                  src={loggedInUser.avatar}
                  alt="Profile"
                  className="h-8 w-8 rounded-full m-2 mr-4"
                />
                Profile
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div>
        <button onClick={handleLogout} className="block px-4 py-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
