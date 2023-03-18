import React from "react";
import AdminSidebar from "../../components/Layout/AdminSidebar";
import withAuthAdmin from "../../hoc/withAuthAdmin";
import Head from "next/head";
const Addresses=()=> {
  return (
    <>
      <Head>
        <title> - Addresses | Moover</title>
      </Head>
      <AdminSidebar>address</AdminSidebar>
    </>
  );
}
export default withAuthAdmin(Addresses);
