import React from "react";
import Link from "next/link";
export default function AdminMenuItems() {
  return (
    <div className="flex flex-col gap-4  h-full">
      <h3 className="font-bold lg:text-lg text-base"> Admin Options </h3>
      <Link
        className="flex gap-2 items-center hover:text-red-700 duration-300 lg:text-lg md:text-base text-sm"
        href="/admin/vendors"
      >
        <i class="fa-solid fa-angle-right"></i> Vendors
      </Link>
      <Link
        className="flex gap-2 items-center hover:text-red-700 duration-300 lg:text-lg md:text-base text-sm"
        href="/admin/vendors"
      >
        <i class="fa-solid fa-angle-right"></i>Drivers
      </Link>
      <Link
        className="flex gap-2 items-center hover:text-red-700 duration-300 lg:text-lg md:text-base text-sm"
        href="/admin/vendors"
      >
        <i class="fa-solid fa-angle-right"></i>Addresses
      </Link>

      <button className="mt-auto border bg-primary hover:bg-primary2 duration-300 text-white font-bold md:text-lg text-base py-2">Logout</button>
    </div>
  );
}
