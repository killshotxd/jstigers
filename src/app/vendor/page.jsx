/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const page = () => {
  const [vendorName, setVendorName] = useState("");
  const [bankAcc, setBankAcc] = useState("");
  const [bankName, setBankName] = useState("");
  const [addressOne, setAddLineOne] = useState("");
  const [addressTwo, setAddLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState();

  const router = useRouter();

  const createVendorHandler = async (e) => {
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

  return (
    <>
      <Toaster />
      <div className="hero top-20 relative bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">Create Vendor</h1>
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
                  onChange={(e) => {
                    setVendorName(e.target.value);
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
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setBankAcc(e.target.value);
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
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setBankName(e.target.value);
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
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setAddLineOne(e.target.value);
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
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setAddLineTwo(e.target.value);
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
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setCity(e.target.value);
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
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setCountry(e.target.value);
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
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button
                onClick={(e) => {
                  createVendorHandler(e);
                }}
                className="btn btn-primary text-white"
              >
                Create Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
