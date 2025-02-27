
import { NavLink } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import Profile from "./Profile";
import PropType from "prop-types";
const MobileMenu = ({ toggleMenu }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#034C41] z-50">
      {/* Close Icon */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleMenu}
          className="w-10 h-10 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
        >
          <MdOutlineClose className="w-6 h-6 mx-auto" />
        </button>
      </div>

      {/* Mobile & Tablet Menu Links */}
      <div className="flex flex-col items-center gap-y-8 text-white">
        <Profile />
        <nav className="flex flex-col items-center gap-y-8">
          <NavLink
            to="/dashboard"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `relative text-white hover:text-gray-200 after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all hover:after:w-full ${
                isActive ? "nav-link active" : "nav-link"
              }`
            }
          >
            DashBoard
          </NavLink>
          <NavLink
            to="/ticket"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `relative text-white hover:text-gray-200 after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all hover:after:w-full ${
                isActive ? "nav-link active" : "nav-link"
              }`
            }
          >
            Tickets
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
    toggleMenu: PropType.func.isRequired,
  };

export default MobileMenu;
