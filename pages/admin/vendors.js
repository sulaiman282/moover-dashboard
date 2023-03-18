import AdminSidebar from "../../components/Layout/AdminSidebar";
import withAuthAdmin from "../../hoc/withAuthAdmin";
import Head from "next/head";
import VendorList from "../../components/Admin/Vendor/VendorList";
import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
const Vendors = () => {
  const [vendorListdata, setVendorListdata] = useState();

  const [trigger, setTrigger] = useState();

  console.log(vendorListdata);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vender/list/`
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
        <VendorList vendorListdata={vendorListdata} setTrigger={setTrigger} />
      </AdminSidebar>
    </>
  );
};
export default withAuthAdmin(Vendors);
