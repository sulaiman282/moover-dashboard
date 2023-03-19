import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import Modal from "react-modal";
import UpdateModal from "./UpdateVendor";
export default function VendorList({ vendorListdata, setTrigger }) {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [modalOpen2, setModalOpen2] = useState(false);
  console.log("modal data",modalData)
  
  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }
  function openModal2() {
    setModalOpen2(true);
  }

  function closeModal2() {
    setModalOpen2(false);
  }
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
 <>
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
                  
                  <div className="flex flex-row  justify-between gap-2 px-2">
                    <i className="fa-solid fa-eye cursor-pointer hover:text-red-700"    onClick={() => {
                          setModalData(item);
                          setModalOpen(true);
                        }}></i>
                    <i className="fa-solid fa-pen-to-square cursor-pointer hover:text-red-700" onClick={() => {
                          setModalData(item);
                          setModalOpen2(true);
                        }}></i>
                    <i
                      className="fa-solid fa-trash cursor-pointer hover:text-red-700"
                      onClick={(e) => DeleteVendor(item?.id)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Modal
    isOpen={modalOpen}
    onRequestClose={closeModal}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 border max-w-[90vw] max-h-[90vh] p-10 lg:p-16 overflow-y-auto"
    contentLabel="Example Modal"
  >
    <i
      class="fa-solid fa-xmark hover:text-red-700 absolute top-0 right-0 m-5 text-2xl cursor-pointer"
      onClick={() => {
        closeModal();
      }}
    ></i>
    <div className="flex lg:flex-row flex-col gap-16">
      <div className=" text-sm md:text-base tracking-wide">
        <h1 className="border-b text-lg lg:text-xl font-bold w-fit border-black mb-3 ">
          Vendor Details:
        </h1>
        <p>
          <span className="font-bold">Name:</span>&nbsp;
          {modalData?.user?.name}
        </p>
        <p>
          <span className="font-bold">User Name:</span>&nbsp;
          {modalData?.user?.username}
        </p>
        <p>
          <span className="font-bold">Phone Number:</span>&nbsp;
          {modalData?.user?.phone_number}
        </p>
        <p>
          <span className="font-bold">Email:</span>&nbsp;
          {modalData?.user?.email}
        </p>
        <p>
          <span className="font-bold">Trade Licence Number:</span>&nbsp;
          {modalData?.trade_license_number}
        </p>
        {modalData?.contract_file && (
              <p>
                <span className="font-bold">Contract File:</span>&nbsp;{" "}
                <a target="_blank" href={process.env.NEXT_PUBLIC_API_URL+modalData?.contract_file}>
                  View Now
                </a>
              </p>
            )}
        {modalData?.trade_license_docs && (
              <p>
                <span className="font-bold">Trading Licence:</span>&nbsp;{" "}
                <a target="_blank" href={process.env.NEXT_PUBLIC_API_URL+modalData?.trade_license_docs}>
                  View Now
                </a>
              </p>
            )}
        {modalData?.vender_agreement && (
              <p>
                <span className="font-bold">Vender Agreement:</span>&nbsp;{" "}
                <a target="_blank" href={process.env.NEXT_PUBLIC_API_URL+modalData?.vender_agreement}>
                  View Now
                </a>
              </p>
            )}

        <p>
          <span className="font-bold">Street:</span>&nbsp;
          {modalData?.address?.street}
        </p>
        <p>
          <span className="font-bold">Area:</span>&nbsp;
          {modalData?.address?.area?.name}
        </p>
        <p>
          <span className="font-bold">City:</span>&nbsp;
          {modalData?.address?.city?.name}
        </p>
        <p>
          <span className="font-bold">State:</span>&nbsp;
          {modalData?.address?.state?.name}
        </p>
        <p>
          <span className="font-bold">Country:</span>&nbsp;
          {modalData?.address?.country?.name}
        </p>
      </div>
    
    </div>
  </Modal>
  <Modal
        isOpen={modalOpen2}
        onRequestClose={closeModal2}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 border max-w-[90vw] w-full max-h-[90vh] p-5 lg:p-16 overflow-y-auto"
        contentLabel="Example Modal"
      >
        <i
          class="fa-solid fa-xmark hover:text-red-700 absolute top-0 right-0 lg:m-5 m-3 text-2xl cursor-pointer"
          onClick={() => {
            closeModal2();
          }}
        ></i>
        <UpdateModal modalData={modalData} setTrigger={setTrigger} setModalOpen2={setModalOpen2}/>
      </Modal>
 </>
  );
}
