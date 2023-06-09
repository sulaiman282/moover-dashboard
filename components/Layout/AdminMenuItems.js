import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from "../../utils/axios"
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

export default function AdminMenuItems({toggleDrawer}) {
  const router = useRouter();
  const [, , removeCookie] = useCookies(["token","usertype"]);


  const logoutFunction=()=>{
    const loading = toast.loading("Please wait a moment...");
    axios
    .post(`/api/auth/logout/`)
    .then((res) => {
      console.log("log out function response ",res);
      const { status, data } = res;
      toast.dismiss(loading);
      if (status === 205) {
        removeCookie("token", { path: "/" });
        removeCookie("usertype", { path: "/" });
        router.push("/");
        toast.success("Logout successful")

      }
    })
    .catch((err) => {
      toast.dismiss(loading);
      console.log("log out function response error ",err);
    });
   
  }








  return (
    <div className="flex flex-col gap-4  h-full">
      <h3 className="font-bold lg:text-lg text-base"> Admin Options </h3>
      <Link
        className={`${router?.pathname == "/admin/vendors" ? "text-primary" : ""} flex gap-2 items-center hover:text-red-700 duration-300 lg:text-lg md:text-base text-sm`}
        href="/admin/vendors"
        onClick={()=>{toggleDrawer()}}
      >
        <i class="fa-solid fa-users-gear mr-2"></i> Vendors
      </Link>
      <Link
        className={`${router?.pathname == "/admin/drivers" ? "text-primary" : ""} flex gap-2 items-center hover:text-red-700 duration-300 lg:text-lg md:text-base text-sm`}
        href="/admin/drivers"
        onClick={()=>{toggleDrawer()}}
      >
      <i className="fa-solid fa-taxi mr-2"></i>Drivers
      </Link>
      <Link
        className={`${router?.pathname == "/admin/addresses" ? "text-primary" : ""} flex gap-2 items-center hover:text-red-700 duration-300 lg:text-lg md:text-base text-sm`}
        href="/admin/addresses"
        onClick={()=>{toggleDrawer()}}
      >
       <i class="fa-solid fa-map-location-dot mr-2"></i>Addresses
      </Link>

      <button className="mt-auto border bg-primary hover:bg-primary2 duration-300 text-white font-bold md:text-lg text-base py-2" onClick={()=>{logoutFunction();toggleDrawer()}}>Logout</button>
    </div>
  );
}
