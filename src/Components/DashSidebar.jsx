import React, { useEffect, useState } from "react";
import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../Redux/Slice/userSlice";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch=useDispatch()
  const Navigate=useNavigate()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
   const handleSignout=async()=>{
       try {
         const res= await fetch('/api/user/signout',{
              method:'POST'
         })
         const data=await res.json()
         if(!res.ok){
           console.log(data.message);
         }else{
   dispatch(signoutSuccess())
   Navigate('/signin')
         }
       } catch (error) {
         console.log(error.message);
         
       }
      }
  return (
    <div>
      <Sidebar className="w-full md:w-56">
        {/* <SidebarItem> */}
          <SidebarItemGroup>
            <Link to="/dashboard?tab=profile">
              <SidebarItem
                active={tab === "profile"}
                icon={HiUser}
                label={"User"}
                labelColor="dark"
                as='div'
              >
                Profile
              </SidebarItem>
            </Link>
            <SidebarItem
              active
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={handleSignout}
            >
              Sign Out
            </SidebarItem>
          </SidebarItemGroup>
        {/* </SidebarItem> */}
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
