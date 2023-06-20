import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">JS Tigers Vendor Management</h1>
            <p className="py-6">
              Vendor management is a crucial aspect of any organization,
              including banks, to ensure efficient operations and minimize risks
              associated with external suppliers or vendors. When it comes to
              vendor management for a bank&apos;s JS (JavaScript) tigers project
            </p>
            <div className="flex gap-4 justify-center items-center">
              <Link href={"/vendor"} className="btn btn-primary">
                Create Vendor
              </Link>
              <Link href={"/listVendor"} className="btn btn-primary">
                Check Vendor List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
