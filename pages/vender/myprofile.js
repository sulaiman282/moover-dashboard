
import withAuthVender from "../../hoc/withAuthVendor"
import Head from "next/head";
import VenderSidebar from "../../components/Layout/VenderSidebar"
import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useCookies } from "react-cookie";
function Myprofile() {
  return (

      <>
    <Head>
        <title>Myprofile - Vender | Moover</title>
      </Head>
      <VenderSidebar>
asdasdasd

      </VenderSidebar>
   
   </>
  )
}
export default withAuthVender(Myprofile);