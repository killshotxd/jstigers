/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserAuth } from "../../../context/AuthContext";
const page = () => {
  const { currentUser } = UserAuth();
  const [updateVendorData, setUpdateVendorData] = useState();
  const [vendorName, setVendorName] = useState("");
  const [bankAcc, setBankAcc] = useState("");
  const [bankName, setBankName] = useState("");
  const [addressOne, setAddLineOne] = useState("");
  const [addressTwo, setAddLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState();

  const router = useRouter();
  const search = useSearchParams();

  const vendorData = search.get("vendorData");

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please Login First");
      setTimeout(() => {
        router.push("/");
      }, 1200);

      return;
    }
    if (vendorData) {
      try {
        const parsedVendorData = JSON.parse(vendorData);
        setUpdateVendorData(parsedVendorData);
      } catch (error) {
        console.error("Error parsing vendorData:", error);
      }
    }
  }, []);

  const createVendorHandler = async (e) => {
    if (!currentUser) {
      toast.error("Please Login First");
      return;
    }
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ill-gold-piranha-gear.cyclic.app/vendor",
        {
          method: "POST",
          body: JSON.stringify({
            vendorName,
            bankAcc,
            bankName,
            addressOne,
            addressTwo,
            city,
            country,
            zip,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success == true) {
        setVendorName("");
        setBankAcc("");
        setBankName("");
        setCity("");
        setAddLineOne("");
        setAddLineTwo("");
        setCountry("");
        setZip("");
        toast.success("Vendor Created Successfully !");
        console.log(data.message);
        router.push("/listVendor");
      } else {
        toast.error("Please check all required fields are filled !");
      }
    } catch (error) {
      console.log(error);
    }
    // Set fields to empty after submission
  };

  const updateVendor = async (e, id) => {
    if (!currentUser) {
      toast.error("Please Login First");
      return;
    }
    e.preventDefault();

    try {
      const res = await fetch(
        `https://ill-gold-piranha-gear.cyclic.app/vendor/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updateVendorData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success == true) {
        setVendorName("");
        setBankAcc("");
        setBankName("");
        setCity("");
        setAddLineOne("");
        setAddLineTwo("");
        setCountry("");
        setZip("");
        toast.success("Vendor Updated Successfully !");
        console.log(data.message);
        router.push("/listVendor");
      } else {
        toast.error("Please check all required fields are filled !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="hero top-20 relative bg-white">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            {vendorData ? (
              <h1 className="text-5xl font-bold">
                Update Vendor =&gt; {updateVendorData?.vendorName}
              </h1>
            ) : (
              <h1 className="text-5xl font-bold">Create Vendor</h1>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control justify-center items-center w-full max-w-xl py-6">
                <label className="label">
                  <span className="label-text">
                    Vendor Name <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  required
                  value={
                    updateVendorData ? updateVendorData?.vendorName : vendorName
                  }
                  onChange={(e) => {
                    if (updateVendorData) {
                      setUpdateVendorData((prevData) => ({
                        ...prevData,
                        vendorName: e.target.value,
                      }));
                    } else if (!updateVendorData) {
                      setVendorName(e.target.value);
                    }
                  }}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control justify-center items-center w-full max-w-xl py-6">
                <label className="label">
                  <span className="label-text">
                    Bank Account No. <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  required
                  value={updateVendorData ? updateVendorData?.bankAcc : bankAcc}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    updateVendorData
                      ? setUpdateVendorData((prevData) => ({
                          ...prevData,
                          bankAcc: e.target.value,
                        }))
                      : setBankAcc(e.target.value);
                  }}
                />
              </div>

              <div className="form-control justify-center items-center w-full max-w-xl py-6">
                <label className="label">
                  <span className="label-text">
                    Bank Name <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  required
                  value={
                    updateVendorData ? updateVendorData?.bankName : bankName
                  }
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    updateVendorData
                      ? setUpdateVendorData((prevData) => ({
                          ...prevData,
                          bankName: e.target.value,
                        }))
                      : setBankName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control justify-center items-center w-full max-w-xl py-6">
                <label className="label">
                  <span className="label-text">
                    Address Line 1 <span className="text-red-600">*</span>
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="Address..."
                  value={
                    updateVendorData ? updateVendorData?.addressOne : addressOne
                  }
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    updateVendorData
                      ? setUpdateVendorData((prevData) => ({
                          ...prevData,
                          addressOne: e.target.value,
                        }))
                      : setAddLineOne(e.target.value);
                  }}
                />
              </div>

              <div className="form-control justify-center items-center w-full max-w-xl py-6">
                <label className="label">
                  <span className="label-text">Address Line 2</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Address..."
                  value={
                    updateVendorData ? updateVendorData?.addressTwo : addressTwo
                  }
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    updateVendorData
                      ? setUpdateVendorData((prevData) => ({
                          ...prevData,
                          addressTwo: e.target.value,
                        }))
                      : setAddLineTwo(e.target.value);
                  }}
                />
              </div>
              <div className="form-control justify-center items-center w-full max-w-xl py-6">
                <label className="label">
                  <span className="label-text">
                    City <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={updateVendorData ? updateVendorData?.city : city}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    updateVendorData
                      ? setUpdateVendorData((prevData) => ({
                          ...prevData,
                          city: e.target.value,
                        }))
                      : setCity(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control justify-center items-center w-full max-w-xl py-6">
                <label className="label">
                  <span className="label-text">
                    Country <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  value={updateVendorData ? updateVendorData?.country : country}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    updateVendorData
                      ? setUpdateVendorData((prevData) => ({
                          ...prevData,
                          country: e.target.value,
                        }))
                      : setCountry(e.target.value);
                  }}
                />
              </div>

              <div className="form-control justify-center items-center w-full max-w-xl py-6">
                <label className="label">
                  <span className="label-text">
                    Zip Code <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Type here"
                  value={updateVendorData ? updateVendorData?.zip : zip}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    updateVendorData
                      ? setUpdateVendorData((prevData) => ({
                          ...prevData,
                          zip: e.target.value,
                        }))
                      : setZip(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              {updateVendorData ? (
                <button
                  onClick={(e) => {
                    updateVendor(e, updateVendorData?._id);
                  }}
                  className="btn btn-primary text-white"
                >
                  Update Vendor
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    createVendorHandler(e);
                  }}
                  className="btn btn-primary text-white"
                >
                  Create Vendor
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
