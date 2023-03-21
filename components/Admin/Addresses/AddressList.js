import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
export default function CreateDriver({ setTrigger, closeModal3 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);

  const [countryList, setCountryList] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [areaList, setAreaList] = useState();

  //get countries on load
  useEffect(() => {
    CountryData();
  }, []);

  //get countries
  async function CountryData() {
    const response = await axios.get(`api/address/countries/`);
    setCountryList(response.data);
  }
  //add countries
  async function CountryDataPost(value) {
    if (value?.length > 0) {
      const response = await axios.post(`api/address/add_country/`, {
        country_name: value,
      });
      const { status } = response;
      if (status == 201) {
        CountryData();
        toast.success("Country added successfully");
      }
    } else {
      toast.error("Please enter country name first");
    }
  }
  //update countries
  async function CountryDataUpdate(values) {
    if (values?.country_name?.length > 0 && values?.country_id?.length > 0) {
      const response = await axios.put(`/api/address/update_country/`, {
        country_name: values.country_name,
        country_id: values.country_id,
      });
      const { status } = response;
      console.log(response);
      if (status == 200) {
        CountryData();
        toast.success("Country updated successfully");
      }
    } else {
      if (values?.country_name?.length < 1) {
        toast.error("Please enter country name.");
      }
      if (values?.country_id?.length < 1) {
        toast.error("Please select country.");
      }
    }
  }
  //delete countries
  async function CountryDataDelete(id) {
    const formData = new FormData();
    formData.append("country_id", id);
    console.log(id);


    if (id?.length > 0) {
      const response = await axios.delete(
        `api/address/delete_country/${id}`,
      );
      const {status} =response;
      if(status==200){
        toast.success("Country Deleted Successfully.");
        CountryData();
      }
 
    } else {
      toast.error("Please select a country first");
    }
  }

  //get state by id
  async function StateData(id) {
    if (id?.length) {
      const response = await axios.get(`api/address/states/${id}`);
      setStateList(response.data);
    } else {
      setStateList(null);
    }
  }
  //add state
  async function StateDataPost(values) {
    if (values?.country_id?.length > 0 && values?.state_name?.length > 0) {
      const response = await axios.post(`api/address/add_state/`, {
        country_id: values?.country_id,
        state_name: values?.state_name,
      });
      const { status } = response;
      if (status == 201) {
        StateData(values?.country_id);
        toast.success("State added successfully");
      }
    } else {
      if (!values?.country_id?.length > 0) {
        toast.error("Please select country first.");
      }
      if (!values?.state_name?.length > 0) {
        toast.error("Please enter state name.");
      }
    }
  }
  //update state
  async function StateDataUpdate(values) {
    if (values?.state_name?.length > 0 && values?.state_id?.length > 0) {
      const response = await axios.put(`api/address/update_state/`, {
        state_name: values.state_name,
        state_id: values.state_id,
      });
      const { status } = response;
      console.log(response);
      if (status == 200) {
        StateData(values?.country_id);
        toast.success("State updated successfully");
      }
    } else {
      if (values?.state_name?.length < 1) {
        toast.error("Please enter state name.");
      }
      if (values?.state_id?.length < 1) {
        toast.error("Please select state.");
      }
    }
  }
  //delete state
  async function StateDataDelete(values) {
    
    if (values.state_id?.length > 0) {
      const response = await axios.delete(
        `api/address/delete_state/${values.state_id}`
        
      );
      console.log(response);
      const {status}=response;
      if(status==200){
        toast.success("State Deleted Successfully.")
        StateData(values.country_id);
      }
    } else {
      toast.error("Please select a state first");
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

  //add city
  async function CityDataPost(values) {
    console.log(values);
    if (values?.state_id?.length > 0 && values?.city_name?.length > 0) {
      const response = await axios.post(`api/address/add_city/`, {
        state_id: values?.state_id,
        city_name: values?.city_name,
      });
      const { status } = response;
      if (status == 201) {
        CityData(values?.state_id);
        toast.success("State added successfully");
      }
    } else {
      if (!values?.state_id?.length > 0) {
        toast.error("Please select state first.");
      }
      if (!values?.city_name?.length > 0) {
        toast.error("Please enter city name.");
      }
    }
  }
  //update city
  async function CityDataUpdate(values) {
    if (values?.city_name?.length > 0 && values?.city_id?.length > 0) {
      const response = await axios.put(`api/address/update_city/`, {
        city_name: values.city_name,
        city_id: values.city_id,
      });
      const { status } = response;
      console.log(response);
      if (status == 200) {
        CityData(values?.country_id);
        toast.success("City updated successfully");
      }
    } else {
      if (values?.city_name?.length < 1) {
        toast.error("Please enter City name.");
      }
      if (values?.city_id?.length < 1) {
        toast.error("Please select City.");
      }
    }
  }
  //delete city
  async function CityDataDelete(values) {
 
    if (values.city_id?.length > 0) {
      const response = await axios.delete(`api/address/delete_city/${values.city_id}`);
      console.log(response);
      const {status}=response;
      if(status==200){
        toast.success("City Deleted Successfully.")
        CityData(values.state_id);
      }
    } else {
      toast.error("Please select a city first");
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



//add area
async function AreaDataPost(values) {
  console.log(values);
  if (values?.city_id?.length > 0 && values?.area_name?.length > 0) {
    const response = await axios.post(`api/address/add_area/`, {
      city_id: values?.city_id,
      area_name: values?.area_name,
    });
    const { status } = response;
    if (status == 201) {
      AreaData(values?.city_id);
      toast.success("City added successfully");
    }
  } else {
    if (!values?.city_id?.length > 0) {
      toast.error("Please select city first.");
    }
    if (!values?.area_name?.length > 0) {
      toast.error("Please enter area name.");
    }
  }
}
//update area
async function AreaDataUpdate(values) {
  if (values?.area_name?.length > 0 && values?.area_id?.length > 0) {
    const response = await axios.put(`api/address/update_area/`, {
      area_name: values.area_name,
      area_id: values.area_id,
    });
    const { status } = response;
    console.log(response);
    if (status == 200) {
      AreaData(values?.city_id);
      toast.success("Area updated successfully");
    }
  } else {
    if (values?.area_name?.length < 1) {
      toast.error("Please enter Area name.");
    }
    if (values?.area_id?.length < 1) {
      toast.error("Please select Area.");
    }
  }
}
//delete area
async function AreaDataDelete(values) {

 
  if (values.area_id?.length > 0) {
    const response = await axios.delete(`api/address/delete_area/${values.area_id}`);
    console.log(response);
    const {status}=response;
    if(status==200){
      toast.success("City Deleted Successfully.")
      AreaData(values.city_id);
    }
  } else {
    toast.error("Please select an city first");
  }
}







  return (
    <div className="">
      <div className="flex justify-between items-center gap-4 border-b cursor-pointer">
        <h2 className="mb-3 text-base md:text-lg lg:text-xl font-bold tracking-wider w-fit">
          Manage addresses
        </h2>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          country_id: "",
          country_name: "",
          state_id: "",
          state_name: "",

          city_id: "",
          city_name: "",

          area_id: "",
          area_name: "",
         
        }}
        validate={(values) => {
          const errors = {};

          // if (!values.country_id) {
          //   errors.country_id = "Please select country.";
          // }
          // if (!values.state_id) {
          //   errors.state_id = "Please select state.";
          // }
          // if (!values.city_id) {
          //   errors.city_id = "Please select city.";
          // }
          // if (!values.area_id) {
          //   errors.area_id = "Please select area.";
          // }
          // if (!values.street) {
          //   errors.street = "Please enter street address.";
          // }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
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
          resetForm,

          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-4  bg-white  p-5 lg:p-10 rounded"
          >
            <div className="flex lg:justify-between lg:flex-row flex-col gap-4">
              <div className="flex flex-col  w-full">
                <div className="flex flex-col w-full ">
                  <small className="mb-1 ml-1">Country</small>
                  <div className="flex gap-2 items-center">
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
                      className="border-0  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none capitalize  w-full"
                    >
                      <option value="">Select country</option>
                      {countryList &&
                        countryList?.map((data, index) => (
                          <option
                            value={data?.id}
                            className="capitalize"
                            key={index}
                          >
                            {data?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <small className="p-2 text-red-700">
                    {errors.country_id &&
                      touched.country_id &&
                      errors.country_id}
                  </small>
                </div>

                <div className="relative w-full mb-3">
                  <div className="flex flex-col  gap-2">
                    <input
                      type="text"
                      name="country_name"
                      onChange={handleChange}
                      autoComplete="off"
                      onBlur={handleBlur}
                      value={values.country_name}
                      className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full h-8"
                      placeholder="Country name"
                    />
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-white shadow-md border hover:shadow-xl duration-300 px-3 rounded-md w-full"
                        onClick={() => {
                          CountryDataPost(values.country_name);
                          values.country_name = "";
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="bg-white shadow-md border hover:shadow-xl duration-300 px-3 rounded-md w-full"
                        onClick={() => {
                          CountryDataUpdate(values);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-700 shadow-md border hover:shadow-xl hover:bg-red-700 hover:text-white duration-300 px-3 rounded-md w-full"
                        onClick={() => CountryDataDelete(values.country_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <small className="p-2 text-red-500">
                    {errors.country_name &&
                      touched.country_name &&
                      errors.country_name}
                  </small>
                </div>
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
                      <option
                        value={data?.id}
                        className="capitalize"
                        key={index}
                      >
                        {data?.name}
                      </option>
                    ))}
                </select>
                <small className="p-2 text-red-700">
                  {errors.state_id && touched.state_id && errors.state_id}
                </small>

                <div className="relative w-full mb-3">
                  <div className="flex flex-col  gap-2">
                    <input
                      type="text"
                      name="state_name"
                      onChange={handleChange}
                      autoComplete="off"
                      onBlur={handleBlur}
                      value={values.state_name}
                      className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full h-8"
                      placeholder="State name"
                    />
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-white shadow-md border hover:shadow-xl duration-300 px-3 rounded-md w-full"
                        onClick={() => {
                          StateDataPost(values);
                          values.state_name = "";
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="bg-white shadow-md border hover:shadow-xl duration-300 px-3 rounded-md w-full"
                        onClick={() => {
                          StateDataUpdate(values);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-700 shadow-md border hover:shadow-xl hover:bg-red-700 hover:text-white duration-300 px-3 rounded-md w-full"
                        onClick={() => StateDataDelete(values)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <small className="p-2 text-red-500">
                    {errors.country_name &&
                      touched.country_name &&
                      errors.country_name}
                  </small>
                </div>
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
                      <option
                        value={data?.id}
                        className="capitalize"
                        key={index}
                      >
                        {data?.name}
                      </option>
                    ))}
                </select>
                <small className="p-2 text-red-700">
                  {errors.city_id && touched.city_id && errors.city_id}
                </small>
                <div className="relative w-full mb-3">
                  <div className="flex flex-col  gap-2">
                    <input
                      type="text"
                      name="city_name"
                      onChange={handleChange}
                      autoComplete="off"
                      onBlur={handleBlur}
                      value={values.city_name}
                      className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full h-8"
                      placeholder="City name"
                    />
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-white shadow-md border hover:shadow-xl duration-300 px-3 rounded-md w-full"
                        onClick={() => {
                          CityDataPost(values);
                          values.city_name = "";
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="bg-white shadow-md border hover:shadow-xl duration-300 px-3 rounded-md w-full"
                        onClick={() => {
                          CityDataUpdate(values);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-700 shadow-md border hover:shadow-xl hover:bg-red-700 hover:text-white duration-300 px-3 rounded-md w-full"
                        onClick={() => CityDataDelete(values)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <small className="p-2 text-red-500">
                    {errors.city_name &&
                      touched.city_name &&
                      errors.city_name}
                  </small>
                </div>
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
                      <option
                        value={data?.id}
                        className="capitalize"
                        key={index}
                      >
                        {data?.name}
                      </option>
                    ))}
                </select>
                <small className="p-2 text-red-700">
                  {errors.area_id && touched.area_id && errors.area_id}
                </small>
                <div className="relative w-full mb-3">
                  <div className="flex flex-col  gap-2">
                    <input
                      type="text"
                      name="area_name"
                      onChange={handleChange}
                      autoComplete="off"
                      onBlur={handleBlur}
                      value={values.area_name}
                      className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full h-8"
                      placeholder="Area name"
                    />
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-white shadow-md border hover:shadow-xl duration-300 px-3 rounded-md w-full"
                        onClick={() => {
                          AreaDataPost(values);
                          values.area_name = "";
                        }}
                      >
                        Add
                      </button>
                      <button
                        className="bg-white shadow-md border hover:shadow-xl duration-300 px-3 rounded-md w-full"
                        onClick={() => {
                          AreaDataUpdate(values);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-700 shadow-md border hover:shadow-xl hover:bg-red-700 hover:text-white duration-300 px-3 rounded-md w-full"
                        onClick={() => AreaDataDelete(values)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <small className="p-2 text-red-500">
                    {errors.area_name &&
                      touched.area_name &&
                      errors.area_name}
                  </small>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
