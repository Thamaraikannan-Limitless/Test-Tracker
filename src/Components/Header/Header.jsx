import { useState } from "react";
import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { IoMenu } from "react-icons/io5";

import Profile from "./Profile";
import logo from "../../assets/logo/limitless-logo.svg";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-[#034C41] to-[#71BF44]  ">
      <section className=" flex justify-between items-center py-2 text-base">
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="limitless-logo"
            className="h-[40px] md:h-[56px]"
          />
        </div>

        {/* Hamburger Icon for Tablet and Mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <IoMenu className="w-7 h-7" />
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden lg:flex lg:items-center gap-x-8">
          <nav className="flex flex-row gap-x-10 text-xs">
            <NavLink
              to="/dashboard"
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
              className={({ isActive }) =>
                `relative text-white hover:text-gray-200 after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all hover:after:w-full ${
                  isActive ? "nav-link active" : "nav-link"
                }`
              }
            >
              Tickets
            </NavLink>
            {/* <NavLink to="/test"  className="relative text-white hover:text-gray-200 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-white after:transition-all hover:after:w-full">test</NavLink> */}
          </nav>
          <div>
            <Profile />
          </div>
        </div>
      </section>

      {/* Mobile & Tablet Menu Overlay */}
      {isOpen && <MobileMenu toggleMenu={toggleMenu} />}
    </header>
  );
};

export default Header;
