import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import Modal from "react-modal";
import UpdateModal from "./UpdateDriverModal";
import CreateDriver from "./CreateDriver";
export default function VendorList({ driverListdata, setTrigger }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  const [pageData, setPagedata] = useState(10);
  const [count, setCount] = useState(1);

  console.log("modal data", modalData);

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
  function openModal3() {
    setModalOpen3(true);
  }

  function closeModal3() {
    setModalOpen3(false);
  }

  //filter driver
  const [search, setSearch] = useState("");

  const filteredUsers = driverListdata?.filter(
    (data) =>
      data?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      data.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      data.vender?.name?.toLowerCase().includes(search.toLowerCase())
  );
  console.log("filtered Data", filteredUsers);

  //update status
  async function UpdateStatus(id) {
    const response = await axios.put(
      `/api/driver/${id}/status/`
    );
    console.log(response);
    setTrigger(Math.floor(Math.random() * (1000 - 1 + 1)) + 1);
  }
  //delete driver
  async function DeleteVendor(id) {
    const response = await axios.delete(
      `/api/driver/${id}/delete/`
    );
    console.log(response);
    setPagedata(10);setCount(1);
    setTrigger(Math.floor(Math.random() * (1000 - 1 + 1)) + 1);
  }

  return (
    <>
      <div>
        <h1 className="mb-3 text-base md:text-lg lg:text-xl font-bold tracking-wider flex justify-between items-center">
          <span> Drivers List </span>{" "}
          <span
            className="text-sm px-3 py-2 rounded-full border-primary border cursor-pointer hover:bg-primary duration-300 hover:text-white"
            onClick={() => openModal3()}
          >
            Register New
          </span>
        </h1>

        <div>
          <input
            className="mb-3  w-full"
            type="text"
            placeholder="Search with vender or driver name or with driver email."
            onChange={(e) => {
              setSearch(e.target.value);setPagedata(10);setCount(1)
            }}
          />
        </div>
      
        <div className="lg:text-base text-sm  w-full  overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 ">
          <table className=" table-auto  text-center min-w-[600px] w-full ">
            <thead className="border   bg-gray-700 text-white">
              <tr>
                <th className="border py-2  w-3/12">Driver Name</th>
                <th className="border py-2   w-3/12">Vendor Name</th>
                <th className="border py-2   w-3/12">Phone Number</th>
                <th className="border py-2   w-1/12 lg:w-2/12">Status</th>

                <th className="border  lg:w-1/12 w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody className="border">
              { filteredUsers?.map((item, index) => 
            
              pageData >= index && pageData<=(index+10)  &&(
<tr
                  key={index}
                  className={`${index % 2 == 0 ? "bg-white" : ""}`}
                >
                  <td className="border break-all	">{item?.user?.name}</td>
                  <td className="border break-all">{item?.vender?.name}</td>
                  <td className="border break-all">
                    {item?.user?.phone_number}
                  </td>
                  <td className="border break-all ">
                    <label className="relative inline-flex items-center cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={() => UpdateStatus(item?.id)}
                        defaultChecked={item?.driver_status == true}
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-primary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
                    </label>
                  </td>

                  <td className="border  ">
                    <div className="flex flex-row  justify-center gap-4 px-2">
                      <i
                        className="fa-solid fa-eye cursor-pointer hover:text-red-700"
                        onClick={() => {
                          setModalData(item);
                          setModalOpen(true);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square cursor-pointer hover:text-red-700"
                        onClick={() => {
                          setModalData(item);
                          setModalOpen2(true);
                        }}
                      ></i>
                    
                    </div>
                  </td>
                </tr>

              )
            
   
           
             
              )}
            </tbody>
          </table>
        </div>
        <p className=" text-xs my-2">Total Count:{filteredUsers?.length}</p>
        <div className="mt-5 flex gap-4 items-center">
          {pageData>10 && (
            <button type="text" className="text-xs border border-primary hover:bg-primary hover:text-white" onClick={()=>{setPagedata(pageData-10); setCount(count-1)}}>Previous</button>
          )}
            
            <button type="text" className="text-xs" disabled>{count}</button>
            {pageData<filteredUsers?.length && (
         <button type="text" className="text-xs border border-primary hover:bg-primary hover:text-white px-6" onClick={()=>{setPagedata(pageData+10); setCount(count+1)}}>Next</button>
          )}
           
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
        {modalData?.profile_pic && (
          <div className="flex justify-center">
            <img
              src={process.env.NEXT_PUBLIC_API_URL + modalData?.profile_pic}
              className="w-40 h-40 p-5 lg:w-64 lg:h-64 object-contain"
            />
          </div>
        )}

      
          <div className=" text-sm md:text-base tracking-wide">
            <h1 className="border-b text-lg lg:text-xl font-bold w-fit border-black mb-3 ">
              Driver Details:
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
            {modalData?.driving_license && (
              <p>
                <span className="font-bold">Driving Licence:</span>&nbsp;{" "}
                <a
                  target="_blank"
                  href={
                    process.env.NEXT_PUBLIC_API_URL + modalData?.driving_license
                  }
                >
                  View Now
                </a>
              </p>
            )}

            {modalData?.identification && (
              <p>
                <span className="font-bold">Identification:</span>&nbsp;{" "}
                <a
                  target="_blank"
                  href={
                    process.env.NEXT_PUBLIC_API_URL + modalData?.identification
                  }
                >
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
        <UpdateModal
          modalData={modalData}
          setTrigger={setTrigger}
          setModalOpen2={setModalOpen2}
        />
      </Modal>
      <Modal
        isOpen={modalOpen3}
        onRequestClose={closeModal3}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 border max-w-[90vw] w-full max-h-[90vh] p-5 lg:p-16 overflow-y-auto"
        contentLabel="Example Modal"
      >
        <i
          class="fa-solid fa-xmark hover:text-red-700 absolute top-0 right-0 lg:m-5 m-3 text-2xl cursor-pointer"
          onClick={() => {
            closeModal3();
          }}
        ></i>
        <CreateDriver setTrigger={setTrigger} closeModal3={closeModal3} />
      </Modal>
    </>
  );
}
