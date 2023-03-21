import React, { useState, useRef, useEffect } from "react";
import VenderMenuItems from "./VenderMenuItems";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";


export default function ProfileSidebar({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {

    if (windowSize?.width < 1024) {
      setIsOpen((prevState) => !prevState);
    } 
    
  };
const windowSize=useWindowSize();
  useEffect(() => {
    if (windowSize?.width > 1024) {
      setIsOpen(false);
    } 
  }, [windowSize]);
  return (
    <>
      <div className="">
        <div className="flex justify-between lg:hidden border-2 bg-primary/10 px-5 py-2">
          <button
            onClick={toggleDrawer}
            className="  hover:text-red-700 duration-300 text-xl"
          >
            <i className="fa-solid fa-bars"></i>
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
              <VenderMenuItems  toggleDrawer={toggleDrawer}/>
            </div>
          </div>
          <div className="  w-full lg:bg-[#F7F8F9] lg:p-16 md:p-10 p-5 lg:min-h-screen  ">{children}</div>
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
              <VenderMenuItems  toggleDrawer={toggleDrawer}/>
            </div>
          </div>
      </Drawer>
    </>
  );
}
