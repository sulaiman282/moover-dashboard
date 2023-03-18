import React from "react";
import Image from "next/image";
import Logo from "../public/logo.png";
import Head from "next/head";
export default function index() {
  return (
    <div>
      <div class="flex flex-col items-center justify-center bg-white md:bg-gray-300 h-screen select-none">
        <div class="flex flex-col  bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl md:shadow-2xl  w-full max-w-md  ">
          <div class="flex justify-center">
            <Image
              placeholder="blur"
              src={Logo}
              alt="Logo"
              className="object-contain h-full w-1/2"
            />
          </div>
          <div class="mt-10">
            <form method="POST" action="" autocomplete="">
              <div class="relative w-full mb-3">
                <input
                  type="email"
                  name="email"
                  class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Email"
                />
                <small class="p-2 text-red-500">* Email</small>
              </div>
              <div class="relative w-full mb-3">
                <input
                  type="password"
                  name="password"
                  class="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Password"
                />
                <small class="p-2 text-red-500">* Password</small>
              </div>
              <div class="text-center mt-6">
                <button
                  type="submit"
                  name="signin"
                  id="signin"
                  class="p-3 rounded-lg bg-primary outline-none text-white shadow w-32 justify-center  hover:bg-primary2"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
