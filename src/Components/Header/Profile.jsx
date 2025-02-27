import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useLoginAuthStore from "../../Store/useLoginAuthStore";
import { IoIosArrowDown } from "react-icons/io";



const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const { user, logout } = useLoginAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileImage = () => {
    if (image) {
      return (
        <img src={image} alt="Profile" className="w-12 h-12 rounded-full" />
      );
    }
    return (
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300 text-white">
        {user?.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Profile Icon */}
      <div
        className="flex items-center gap-x-9 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-x-2 ">
          <label className="cursor-pointer">
            {renderProfileImage()}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <div className="text-white ">
            <h6 className="text-xs font-bold leading-none pt-0">
              {user?.name}
              <span className="text-[10px] font-extralight block leading-0 pt-1 mt-1">
                Ui/Ux Designer
              </span>
            </h6>
          </div>
        </div>

        <IoIosArrowDown className="w-5 text-white ml-2" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <nav className="absolute right-0 bg-white  mt-4 w-52 h-10 text-center rounded-md text-black z-10 hover:bg-gray-200">
          <ul className="bg-white  p-4 shadow-xl">
            <li
              onClick={() => logout(navigate)}
              className="px-2 py-2 bg-gradient-to-r from-[#034C41] to-[#71BF44] rounded-lg shadow-sm shadow-green-600 text-white cursor-pointer"
            >
              Log Out
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Profile;
