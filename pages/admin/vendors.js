import AdminSidebar from "../../components/Layout/AdminSidebar";
import withAuthAdmin from "../../hoc/withAuthAdmin";
import Head from "next/head";
import VendorList from "../../components/Admin/Vendor/VendorList";
import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import CreateVendor from "../../components/Admin/Vendor/CreateVendor"
const Vendors = () => {
  const [vendorListdata, setVendorListdata] = useState();

  const [trigger, setTrigger] = useState();

  console.log(vendorListdata);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/api/vender/list/`
      );
      setVendorListdata(response.data);
    }
    fetchData();
  }, [trigger]);

  return (
    <>
      <Head>
        <title>Vendor - Admin | Moover</title>
      </Head>
      <AdminSidebar>

      <div className="flex flex-col gap-12">
      <VendorList vendorListdata={vendorListdata} setTrigger={setTrigger} />
        <CreateVendor setTrigger={setTrigger}/>
        </div>
    
      </AdminSidebar>
    </>
  );
};
export default withAuthAdmin(Vendors);
