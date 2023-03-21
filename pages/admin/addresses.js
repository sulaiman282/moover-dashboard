import React from "react";
import AdminSidebar from "../../components/Layout/AdminSidebar";
import withAuthAdmin from "../../hoc/withAuthAdmin";
import Head from "next/head";
import AddressList from "../../components/Admin/Addresses/AddressList"
const Addresses=()=> {
  return (
    <>
      <Head>
        <title>Addresses -Admin | Moover</title>
      </Head>
      <AdminSidebar><AddressList/></AdminSidebar>
    </>
  );
}
export default withAuthAdmin(Addresses);
