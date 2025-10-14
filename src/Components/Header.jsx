import {
  Button,
  Navbar,
  TextInput,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../Redux/Slice/themeSlice.js";
import { signoutSuccess } from "../Redux/Slice/userSlice.js";


const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        Navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    Navigate(`/search?${searchQuery}`);
  };
  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            blogger
          </span>
          Hunt
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search...."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray">
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            <FaMoon />
          </Button>
          {currentUser ? (
            <Dropdown
              className=""
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">
                  Name:{currentUser.username}
                </span>
              </DropdownHeader>
              <DropdownDivider />
              <DropdownHeader>
                <span className="block text-sm font-medium truncate">
                  email:{currentUser.email}
                </span>
              </DropdownHeader>
              <DropdownHeader>
                <Link to="/dashboard?tab=profile">
                  <DropdownItem>Profile</DropdownItem>
                </Link>
                <DropdownDivider />
                <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
              </DropdownHeader>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
                outline
              >
                Sign-In
              </Button>
            </Link>
          )}

          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </NavbarLink>
          <NavbarLink active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </NavbarLink>
          <NavbarLink active={path === "/project"} as={"div"}>
            <Link to="/project">Project</Link>
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Header;
