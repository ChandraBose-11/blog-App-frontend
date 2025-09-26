import React, { useEffect, useState } from "react";
import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
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
