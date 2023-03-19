import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
export default function CreateDriver({ setTrigger }) {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);





  const [countryList, setCountryList] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [areaList, setAreaList] = useState();

  //get vendors list ad countries on load
  useEffect(() => {

    async function CountryData() {
      const response = await axios.get(`api/address/countries/`);
      setCountryList(response.data);
    }
    CountryData();

  }, []);

  //get state by id
  async function StateData(id) {
    if (id?.length) {
      const response = await axios.get(`api/address/states/${id}`);
      setStateList(response.data);
    } else {
      setStateList(null);
    }
  }

  //get city by id
  async function CityData(id) {
    if (id?.length) {
      const response = await axios.get(`api/address/cities/${id}`);
      setCityList(response.data);
    } else {
      setCityList(null);
    }
  }

  //get area by id
  async function AreaData(id) {
    if (id?.length) {
      const response = await axios.get(`api/address/all_area/${id}`);
      setAreaList(response.data);
    } else {
      setAreaList(null);
    }
  }

  //register api
  async function CreateVendor(values, resetForm) {
    console.log(values);
    const formData = new FormData();
    formData.append("trade_license_number", values.trade_license_number);
    formData.append("type", values.type);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("number", values.number);
    formData.append("country_id", values.country_id);
    formData.append("state_id", values.state_id);
    formData.append("city_id", values.city_id);
    formData.append("area_id", values.area_id);
    formData.append("street", values.street);
    formData.append("trade_license_docs", values.trade_license_docs);
    formData.append("contract_file", values.contract_file);
    formData.append("vender_agreement", values.vender_agreement);


    const loading = toast.loading("Please wait a moment.");
    try {
      const res = await axios.post(`/api/vender/register/`, formData);
      setIsLoading(false);
      toast.dismiss(loading);
      const { status, data } = res;
      console.log("submit data ", res);
      if (status === 201) {
        toast.success("Driver created Successfully.");
        resetForm();
        setTrigger(Math.floor(Math.random() * (1000 - 1 + 1)) + 1);
      }
      if (status === 204) {
        toast.success("Email or Phone number already exists.");
      }
    } catch (error) {
      setIsLoading(false);

      toast.error("Something went wrong ! Please try again");
      console.log("error from submit", error);
    }
  }

  // console.log("countryList list", countryList);

  return (
    <div className="">
      <div className="flex justify-between items-center gap-4 border-b cursor-pointer" onClick={()=>{setShow(!show)}}>
        <h2 className="mb-3 text-base md:text-lg lg:text-xl font-bold tracking-wider w-fit">
          Register a vendor
        </h2>
        {
          !show ? <i className="fa-solid fa-caret-down"></i> :<i className="fa-solid fa-caret-right"></i>
        }
      </div>
{show && (

<Formik
enableReinitialize
initialValues={{
  type: "",
  first_name: "",
  last_name: "",
  email: "",
  number: "",
  country_id: "",
  state_id: "",
  city_id: "",
  area_id: "",
  street: "",
  trade_license_number:"",
  trade_license_docs:[],
  contract_file:[],
  vender_agreement:[],

}}
validate={(values) => {
  const errors = {};

 
  if (!values.type) {
    errors.type = "Please select type.";
  }
  if (!values.trade_license_number) {
    errors.trade_license_number = "Please enter trade licence number.";
  }
  if (!values.first_name) {
    errors.first_name = "Please enter first name.";
  }
  if (!values.last_name) {
    errors.last_name = "Please enter last name.";
  }
  if (!values.email) {
    errors.email = "Please enter email.";
  }
  if (!values.number) {
    errors.number = "Please enter number.";
  }
  if (!values.country_id) {
    errors.country_id = "Please select country.";
  }
  if (!values.state_id) {
    errors.state_id = "Please select state.";
  }
  if (!values.city_id) {
    errors.city_id = "Please select city.";
  }
  if (!values.area_id) {
    errors.area_id = "Please select area.";
  }
  if (!values.street) {
    errors.street = "Please enter street address.";
  }

  return errors;
}}
onSubmit={(values, { resetForm }) => {
  CreateVendor(values, resetForm);

  console.log("Form values", values);
}}
>
{({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,

  /* and other goodies */
}) => (
  <form
    onSubmit={handleSubmit}
    className=" flex flex-col gap-4  bg-white  p-5 lg:p-10 rounded"
  >
    

    <div className="flex lg:justify-between lg:flex-row flex-col gap-4">
      <div className="relative w-full ">
        <small className="mb-1 ml-1">First Name</small>
        <input
          type="text"
          name="first_name"
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          value={values.first_name}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
          placeholder="First Name"
        />
        <small className="p-2 text-red-700">
          {errors.first_name && touched.first_name && errors.first_name}
        </small>
      </div>
      <div className="relative w-full ">
        <small className="mb-1 ml-1">Last Name</small>
        <input
          type="text"
          name="last_name"
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          value={values.last_name}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
          placeholder="Last Name"
        />
        <small className="p-2 text-red-700">
          {errors.last_name && touched.last_name && errors.last_name}
        </small>
      </div>
      <div className="relative w-full ">
        <small className="mb-1 ml-1">Email</small>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          value={values.email}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
          placeholder="Email"
        />
        <small className="p-2 text-red-700">
          {errors.email && touched.email && errors.email}
        </small>
      </div>
      <div className="relative w-full ">
        <small className="mb-1 ml-1">Phone</small>
        <input
          type="number"
          name="number"
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          value={values.number}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
          placeholder="Phone number"
        />
        <small className="p-2 text-red-700">
          {errors.number && touched.number && errors.number}
        </small>
      </div>
    </div>

    <div className="flex lg:justify-between lg:flex-row flex-col gap-4">
      <div className="flex flex-col w-full ">
        <small className="mb-1 ml-1">Country</small>

        <select
          onChange={(e) => {
            handleChange(e);
            StateData(e.target.value);
            values.state_id = "";
            values.city_id = "";
            values.area_id = "";
          }}
          onBlur={handleBlur}
          value={values.country_id}
          name="country_id"
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
        >
          <option value="">Select country</option>
          {countryList &&
            countryList?.map((data, index) => (
              <option value={data?.id} key={index}>
                {data?.name}
              </option>
            ))}
        </select>
        <small className="p-2 text-red-700">
          {errors.country_id && touched.country_id && errors.country_id}
        </small>
      </div>
      <div className="flex flex-col w-full ">
        <small className="mb-1 ml-1">State</small>

        <select
          name="state_id"
          value={values.state_id}
          onChange={(e) => {
            handleChange(e);
            CityData(e.target.value);
            values.city_id = "";
            values.area_id = "";
          }}
          onBlur={handleBlur}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
        >
          <option value="">Select state</option>
          {stateList &&
            stateList?.map((data, index) => (
              <option value={data?.id} key={index}>
                {data?.name}
              </option>
            ))}
        </select>
        <small className="p-2 text-red-700">
          {errors.state_id && touched.state_id && errors.state_id}
        </small>
      </div>
      <div className="flex flex-col w-full ">
        <small className="mb-1 ml-1">City</small>

        <select
          name="city_id"
          value={values.city_id}
          onChange={(e) => {
            handleChange(e);
            AreaData(e.target.value);
            values.area_id = "";
          }}
          onBlur={handleBlur}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
        >
          <option value="">Select city</option>
          {cityList &&
            cityList?.map((data, index) => (
              <option value={data?.id} key={index}>
                {data?.name}
              </option>
            ))}
        </select>
        <small className="p-2 text-red-700">
          {errors.city_id && touched.city_id && errors.city_id}
        </small>
      </div>
      <div className="flex flex-col w-full ">
        <small className="mb-1 ml-1">Area</small>

        <select
          name="area_id"
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={handleBlur}
          value={values.area_id}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
        >
          <option value="">Select area</option>
          {areaList &&
            areaList?.map((data, index) => (
              <option value={data?.id} key={index}>
                {data?.name}
              </option>
            ))}
        </select>
        <small className="p-2 text-red-700">
          {errors.area_id && touched.area_id && errors.area_id}
        </small>
      </div>
    </div>

    <div className="lg:flex-row flex-col flex gap-4 ">

<div className="relative w-full   ">
  <small className="mb-1 ml-1">Street Address</small>
  <input
    type="text"
    name="street"
    onChange={handleChange}
    autoComplete="off"
    onBlur={handleBlur}
    value={values.street}
    className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
    placeholder="Enter street address"
  />
  <small className="p-2 text-red-700">
    {errors.street && touched.street && errors.street}
  </small>
</div>
<div className="relative w-full  lg:w-1/2 ">
  <small className="mb-1 ml-1">Trade Licence Number</small>
  <input
    type="text"
    name="trade_license_number"
    onChange={handleChange}
    autoComplete="off"
    onBlur={handleBlur}
    value={values.trade_license_number}
    className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
    placeholder="Enter trade license number address"
  />
  <small className="p-2 text-red-700">
    {errors.trade_license_number && touched.trade_license_number && errors.trade_license_number}
  </small>
</div>

  <div className="flex flex-col  w-full lg:w-1/2 ">
    <small className="mb-1 ml-1">Type</small>

    <select
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.type}
      name="type"
      className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
    >
      <option value="">Select type</option>
      <option value="home">Home</option>
      <option value="office">Office</option>
    </select>

    <small className="p-2 text-red-700">
      {errors.type && touched.type && errors.type}
    </small>
  </div>
</div>
 

<div className="flex lg:flex-row flex-col gap-4">
<div className="relative w-full ">
        <small className="mb-1 ml-1">trade_license_docs</small>
        <input
          type="file"
          accept=".pdf"
          name="trade_license_docs"
          onChange={(e) => {
            values.trade_license_docs = e.target.files[0];
          }}
          autoComplete="off"
          onBlur={handleBlur}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
          placeholder="Trade license docs"
        />
        <small className="p-2 text-red-700">
          {errors.trade_license_docs &&
            touched.trade_license_docs &&
            errors.trade_license_docs}
        </small>
      </div>

      <div className="relative w-full ">
        <small className="mb-1 ml-1">Contract File</small>
        <input
          type="file"
          accept=".pdf"
          name="contract_file"
          onChange={(e) => {
            values.contract_file = e.target.files[0];
          }}
          autoComplete="off"
          onBlur={handleBlur}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
          placeholder="contract_file"
        />
        <small className="p-2 text-red-700">
          {errors.contract_file && touched.contract_file && errors.contract_file}
        </small>
      </div>

      <div className="relative w-full ">
        <small className="mb-1 ml-1">vender_agreement</small>
        <input
          type="file"
          accept=".pdf"
          name="vender_agreement"
          onChange={(e) => {
            values.vender_agreement = e.target.files[0];
          }}
          autoComplete="off"
          onBlur={handleBlur}
          className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none  w-full"
          placeholder="vender_agreement"
        />
        <small className="p-2 text-red-700">
          {errors.vender_agreement &&
            touched.vender_agreement &&
            errors.vender_agreement}
        </small>
      </div>
    </div>

    <button
      type="submit"
      disabled={isLoading}
      className="py-2 rounded   text-white shadow w-32 justify-center  bg-gray-700 hover:bg-gray-900"
    >
      Add Driver
    </button>
  </form>
)}
</Formik>
)}
    
    </div>
  );
}
