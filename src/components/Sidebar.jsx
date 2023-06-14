import { useCallback, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { links } from "../assets/constants";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/auth/authActions";
import { logo } from "../assets";

import purpwav from "../assets/purpwav.png";

const NavLinks = ({ handleClick, onLogout }) => {
  const memoizedSelector = useCallback((state) => {
    return state.auth;
  }, []);

  const { isAuthenticated, user } = useSelector(memoizedSelector);

  return (
    <div className="mt-10">
      <div className="text-white flex items-center justify-center  ">
        {isAuthenticated ? (
          <>
            <button
              className="text-white bg-gradient-to-r from-[#921286] to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2 animate-slideleft"
              style={{ maxWidth: "200px" }}
            >
              Hi {user && user.name ? user.name : "non name"}!
            </button>
            <button
              className="text-white bg-gradient-to-r from-[#921286] to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2 animate-slideright"
              onClick={onLogout}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button className="text-white bg-gradient-to-r from-pink-500 to-[#921986] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2 animate-slideleft">
              <Link className="p-4" to="/login">
                Login
              </Link>
            </button>
            <button className="text-white bg-gradient-to-r from-pink-500 to-[#921986] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2 animate-slideleft">
              <Link className="p-4" to="/Register">
                Register
              </Link>
            </button>
          </>
        )}
      </div>
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          activeClassName="text-[#FF0266]"
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:cyan-400"
          onClick={() => {
            handleClick && handleClick(false);
            // sectionRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFrontPageRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <p className="text-center text-blue-300 pb-2 text-xl">.WAV</p>
        <img
          src={purpwav}
          className="w-full h-14 object-contain cursor-pointer"
          onClick={handleFrontPageRedirect}
        />
        <NavLinks onLogout={() => dispatch(logoutUser())} />
      </div>

      {/* mobile side bar */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-6 h-6 text-white mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-6 h-6 text-white mr-2"
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          src={purpwav}
          alt="logo"
          className="w-full h-14 object-contain"
          onClick={handleFrontPageRedirect}
        />

        <NavLinks
          onLogout={() => dispatch(logoutUser())}
          handleClick={() => setMobileMenuOpen(false)}
        />
      </div>
    </>
  );
};

export default Sidebar;
