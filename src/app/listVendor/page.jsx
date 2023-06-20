/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserAuth } from "../../../context/AuthContext";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
const page = () => {
  const { currentUser } = UserAuth();
  const router = useRouter();
  const [vendorList, setVendorList] = useState(null);
  const getVendors = async () => {
    try {
      const getData = await fetch(
        "https://ill-gold-piranha-gear.cyclic.app/vendor",
        {
          cache: "no-cache",
        }
      );

      const data = await getData.json();
      console.log(data);
      setVendorList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!currentUser) {
      toast.error("Please Login First");
      return;
    }
    try {
      const res = await fetch(
        `https://ill-gold-piranha-gear.cyclic.app/vendor/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success == true) {
        toast.success("Vendor Deleted Successfully");
        getVendors();
        router.refresh();
      } else {
        toast.error("Error Deleting Data !");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendors();
  }, []);
  return (
    <>
      <div className=" flex flex-col justify-center items-center min-h-screen bg-base-200">
        <Toaster />
        {vendorList?.length == 0 ? (
          <div className=" flex flex-col justify-center items-center min-h-screen bg-base-200">
            <p className="text-xl font-semibold"> Please add a Vendor</p>
            <Link href={"/vendor"} className="btn mt-3 btn-primary">
              Create a Vendor
            </Link>
          </div>
        ) : (
          <section className="mx-auto w-full max-w-7xl px-4 py-4 mt-8">
            <div className="mt-6 flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Vendor Name
                          </th>
                          <th
                            scope="col"
                            className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Bank Account No.
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Bank Name
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Address Line 1
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Address Line 2
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            City
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Country
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Zip Code
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {vendorList?.map((person) => (
                          <tr key={person._id}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {person.vendorName}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-12 py-4">
                              <div className="text-sm text-gray-900 ">
                                {person.bankAcc}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {person.bankName}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {person.addressOne}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {person.addressTwo}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {person.country}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {person.city}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {person.zip}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              <div className="flex gap-4">
                                <button
                                  className="btn bg-red-400"
                                  onClick={() => handleDelete(person._id)}
                                >
                                  <IoMdTrash />
                                </button>
                                <Link
                                  href={{
                                    pathname: "/vendor",
                                    query: {
                                      vendorData: JSON.stringify(person), // Convert the state to a string
                                    },
                                  }}
                                  className="btn bg-teal-400"
                                >
                                  <MdModeEdit />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center justify-center pt-6">
              <a
                href="#"
                className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900"
              >
                <span className="hidden lg:block">&larr; Previous</span>
                <span className="block lg:hidden">&larr;</span>
              </a>
              <a
                href="#"
                className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
              >
                1
              </a>
              <a
                href="#"
                className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
              >
                2
              </a>
              <a
                href="#"
                className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
              >
                3
              </a>
              <a
                href="#"
                className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
              >
                4
              </a>
              <a href="#" className="mx-2 text-sm font-semibold text-gray-900">
                <span className="hidden lg:block">Next &rarr;</span>
                <span className="block lg:hidden">&rarr;</span>
              </a>
            </div> */}
          </section>
        )}
      </div>
    </>
  );
};

export default page;
