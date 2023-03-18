import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../public/logo.png";
import Head from "next/head";
import { Formik } from "formik";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import withPublic from "../hoc/withPublic";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [cookie, setCookie] = useCookies(["token", "usertype"]);
  const router = useRouter();

  const loginapifunction = async (values) => {
    console.log(values);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    const loading = toast.loading("Please wait a moment...");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`,
        formData
      );
      setIsLoading(false);
     
      const { status, data } = res;

      if (status === 200) {
        toast.dismiss(loading);
        // toast.success("Logged in Successfully");
        console.log(data);
        setCookie("token", data?.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        if (data?.isAdmin == true) {
          console.log("admin true");
          setCookie("usertype", "admin", {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
          });
          router.push("/admin/vendors");
        } else if (data?.is_vendor == true) {
          console.log("vendor true");
          setCookie("usertype", "vendor", {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
          });
          router.push("/vendor/drivers");
        }
      }
    } catch (error) {
      toast.dismiss(loading);
      setIsLoading(false);
        toast.error("Invalid User");
     
    }
  };
  return (
    <>
      <Head>
        <title>Login | Moover</title>
      </Head>
      <div>
        <div className="flex flex-col items-center justify-center bg-white md:bg-[#F7F8F9] h-screen select-none">
          <div className="flex flex-col  bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl md:shadow-2xl  w-full max-w-md  ">
            <div className="flex justify-center">
              <Image
                placeholder="blur"
                src={Logo}
                alt="Logo"
                className="object-contain h-full w-1/2"
              />
            </div>
            <div className="mt-10">
              <Formik
                enableReinitialize
                initialValues={{
                  username: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.username) {
                    errors.username = "Please enter your username.";
                  }

                  if (!values.password) {
                    errors.password = "Please enter your password.";
                  } else if (values.password?.length < 4) {
                    errors.password =
                      "Password should be more than 4 characters.";
                  }
                  return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                  loginapifunction(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,

                  /* and other goodies */
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6 "
                  >
                    <div className="relative w-full mb-3">
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        autoComplete="off"
                        onBlur={handleBlur}
                        value={values.username}
                        className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Username"
                      />
                      <small className="p-2 text-red-500">
                        {errors.username && touched.username && errors.username}
                      </small>
                    </div>
                    <div className="relative w-full mb-3">
                      <input
                        type="password"
                        name="password"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                      />
                      <small className="p-2 text-red-500">
                        {errors.password && touched.password && errors.password}
                      </small>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        type="submit"
                        name="signin"
                        id="signin"
                        disabled={isLoading}
                        className="p-3 rounded-lg bg-primary outline-none text-white shadow w-32 justify-center  hover:bg-primary2"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withPublic(Index);
