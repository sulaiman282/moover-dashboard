import AdminSidebar from "../../components/Layout/AdminSidebar";
import withAuthAdmin from "../../hoc/withAuthAdmin";
import Head from "next/head";
import DriverList from "../../components/Admin/Driver/DriverList";
import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import CreateDriver from "@/components/Admin/Driver/CreateDriver";
const Drivers = () => {
  const [driverListdata, setDriverListdata] = useState();

  const [trigger, setTrigger] = useState();

  console.log(driverListdata);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/api/driver/list/`
      );
      setDriverListdata(response.data);
    }
    fetchData();
  }, [trigger]);

  return (
    <>
      <Head>
        <title>Drivers - Admin | Moover</title>
      </Head>
      <AdminSidebar>
    
        <div className="flex flex-col gap-12">
        <DriverList driverListdata={driverListdata} setTrigger={setTrigger} />
        <CreateDriver setTrigger={setTrigger}/>
        </div>
      </AdminSidebar>
    </>
  );
};
export default withAuthAdmin(Drivers);
