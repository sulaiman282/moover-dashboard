
import React, { useState, useEffect } from "react";
import Head from "next/head";
import withAuthVender from "../../hoc/withAuthVendor"
import VenderSidebar from "../../components/Layout/VenderSidebar"
import axios from "../../utils/axios";
import { useCookies } from "react-cookie";
import DriverList from "../../components/Vender/Drivers/DriverList";
 function Drivers() {
    const [driverListdata, setDriverListdata] = useState();

    const [trigger, setTrigger] = useState();
    const [cookies] = useCookies(["token","usertype"]);
    console.log(driverListdata);
  
    useEffect(() => {
      if(cookies?.token){
        async function fetchData() {
          const response = await axios.get(
            `/api/vender/mydriver/`
          );
          setDriverListdata(response.data);
        }
        fetchData();
  
      }
    
    }, [trigger]);

    console.log(driverListdata)
  return (
   <>
    <Head>
        <title>Drivers - Vender | Moover</title>
      </Head>

      <VenderSidebar>
      <DriverList driverListdata={driverListdata} setTrigger={setTrigger} />
      </VenderSidebar>
      
   </>
  )
}
export default withAuthVender(Drivers);