import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";

export default function VendorList({ vendorListdata, setTrigger }) {


    async function UpdateStatus(id) {
        console.log("i am inside delete", id);
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vender/${id}/status/`
        );
        console.log(response);
        setTrigger(Math.floor(Math.random() * (1000 - 1 + 1)) + 1);
      }





  async function DeleteVendor(id) {
    console.log("i am inside delete", id);
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/vender/${id}/delete/`
    );
    console.log(response);
    setTrigger(Math.floor(Math.random() * (1000 - 1 + 1)) + 1);
  }



  return (
    <div>
      <h1 className="mb-3 text-base md:text-lg lg:text-xl font-bold tracking-wider">
        Vendors List
      </h1>
      <div className="lg:text-base text-sm  w-full  overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 ">
        <table className=" table-auto  text-center min-w-[600px] w-full ">
          <thead className="border   bg-gray-700 text-white">
            <tr>
              <th className="border py-2  w-3/12">Name</th>
              <th className="border py-2   w-3/12">Email</th>
              <th className="border py-2   w-3/12">Phone Number</th>
              <th className="border py-2   w-1/12 lg:w-2/12">Status</th>
           
              <th className="border  lg:w-1/12 w-2/12">Actions</th>
            </tr>
          </thead>
          <tbody className="border">
            {vendorListdata?.map((item, index) => (
              <tr key={index} className={`${index % 2 == 0 ? "bg-white" : ""}`}>
                <td className="border break-all	">{item?.user?.name}</td>
                <td className="border break-all">{item?.user?.email}</td>
                <td className="border break-all">{item?.user?.phone_number}</td>
                <td className="border break-all ">
                  <label className="relative inline-flex items-center cursor-pointer mt-2">
                    <input type="checkbox" value="" className="sr-only peer" onChange={()=>UpdateStatus(item?.id)} defaultChecked={item?.vender_status == true} />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
                  </label>
                </td>
             
                <td className="border  ">
                  {" "}
                  <div className="flex flex-row  justify-between gap-2 px-2">
                    <i className="fa-solid fa-eye cursor-pointer hover:text-red-700"></i>{" "}
                    <i className="fa-solid fa-pen-to-square cursor-pointer hover:text-red-700"></i>{" "}
                    <i
                      className="fa-solid fa-trash cursor-pointer hover:text-red-700"
                      onClick={(e) => DeleteVendor(item?.id)}
                    ></i>
                  </div>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
