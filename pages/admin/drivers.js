import AdminSidebar from "../../components/Layout/AdminSidebar";
import withAuthAdmin from "../../hoc/withAuthAdmin";
import Head from "next/head";
import DriverList from "../../components/Admin/Driver/DriverList";
import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import CreateDriver from "@/components/Admin/Driver/CreateDriver";
import { useCookies } from "react-cookie";

const Drivers = () => {
  const [driverListdata, setDriverListdata] = useState();

  const [trigger, setTrigger] = useState();
  const [cookies] = useCookies(["token","usertype"]);
  console.log(driverListdata);

  useEffect(() => {
    if(cookies?.token){
      async function fetchData() {
        const response = await axios.get(
          `/api/driver/list/`
        );
        setDriverListdata(response.data);
      }
      fetchData();

    }
  
  }, [trigger]);

  return (
    <>
      <Head>
        <title>Drivers - Admin | Moover</title>
      </Head>
      <AdminSidebar>
    
        <DriverList driverListdata={driverListdata} setTrigger={setTrigger} />
      
      </AdminSidebar>
    </>
  );
};
export default withAuthAdmin(Drivers);
