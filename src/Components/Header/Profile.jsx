import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useLoginAuthStore from "../../Store/useLoginAuthStore";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import PropTypes from "prop-types";

const Profile = ({ isMobileMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const { user, logout } = useLoginAuthStore();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Function to handle clicks outside the dropdown menu
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove event listener when the component unmounts or menu closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
      return <img src={image} alt="Profile" className="w-12 h-12 rounded-full" />;
    }
    return (
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E5E7EB] text-black">
        {user?.name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon */}
      <div
        className="flex items-center gap-x-9 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-x-2">
          <label className="cursor-pointer">
            {renderProfileImage()}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <div className="text-white">
            <h6 className="text-xs font-bold leading-none pt-0">
              {user?.name.toUpperCase()}
              <span className="text-[10px] font-extralight block leading-0 pt-1 mt-1">
                Ui/Ux Designer
              </span>
            </h6>
          </div>
        </div>

        {/* Show Arrow only if Mobile Menu is NOT open */}
        {!isMobileMenuOpen && <IoIosArrowDown className="w-5 text-white ml-2" />}
      </div>

      {/* Dropdown Menu */}
      {isOpen && !isMobileMenuOpen && (
        <nav className="absolute right-0 bg-white mt-4 w-[250px] h-auto text-left rounded-md text-black z-10 shadow-xl">
          <div className="flex items-center gap-x-9 cursor-pointer border-b-2 border-[#bcb9b9] p-2">
            <div className="flex items-center gap-x-2 pb-2 ">
              <label className="cursor-pointer">
                {renderProfileImage()}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <div className="pt-2">
                <h6 className="text-xs font-bold leading-none pt-0">
                  {user?.name.toUpperCase()}
                  <span className="text-[10px] font-extralight block leading-0 pt-1 mt-1">
                    Ui/Ux Designer
                  </span>
                </h6>
              </div>
            </div>
          </div>
          <ul className="bg-white p-4">
            <div className="border-b-2 border-[#bcb9b9] w-full">
              <li className="py-2 cursor-pointer">
                <span className="mr-4"><FiEdit className="inline " /></span> Edit Profile
              </li>
            </div>
            <div className="">
            <li
              onClick={() => logout(navigate)}
              className=" py-2 cursor-pointer "
            >
              <span className=""><MdOutlineLogout className="inline text-xl mr-4" /></span> Log Out
              </li>
              </div>
          </ul>
        </nav>
      )}
    </div>
  );
};

Profile.propTypes = {
  isMobileMenuOpen: PropTypes.bool.isRequired,
};

export default Profile;
