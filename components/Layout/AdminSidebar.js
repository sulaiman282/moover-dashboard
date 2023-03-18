import React from "react";
import AdminMenuItems from "./AdminMenuItems";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";

export default function ProfileSidebar({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <div className="">
        <div className="flex justify-between lg:hidden border-2 bg-primary/10 px-5 py-2">
          <button
            onClick={toggleDrawer}
            className="  hover:text-red-700 duration-300 text-xl"
          >
            <i class="fa-solid fa-bars"></i>
          </button>

          <Link href="/admin/vendors">
            <Image
              placeholder="blur"
              src={Logo}
              alt="Logo"
              className="object-contain h-8"
            />
          </Link>

          <span></span>
        </div>
        <div className="flex  ">
          <div className="border-r h-screen sticky top-0 lg:flex flex-col hidden w-64 bg-[#FBFBF9">
            <div className=" border-b flex justify-center p-5 ">
              <Link href="/admin/vendors">
                <Image
                  placeholder="blur"
                  src={Logo}
                  alt="Logo"
                  className="object-contain h-8 w-32"
                />
              </Link>
            </div>
            <div className="p-5 h-full">
              <AdminMenuItems />
            </div>
          </div>
          <div className="  w-full lg:bg-[#F7F8F9] lg:p-16 md:p-10 p-5 lg:min-h-screen ">{children}</div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
        lockBackgroundScroll="true"
      >
         <div className=" h-screen">
            <div className="py-3 border-b flex justify-center">
              <Link href="/admin/vendors">
                <Image
                  placeholder="blur"
                  src={Logo}
                  alt="Logo"
                  className="object-contain h-8 w-32"
                />
              </Link>
            </div>
            <div className="p-5 h-5/6">
              <AdminMenuItems />
            </div>
          </div>
      </Drawer>
    </>
  );
}
