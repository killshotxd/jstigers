"use client";

import { UserAuth } from "../../context/AuthContext";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { currentUser, signInGoogle, logout } = UserAuth();

  const handleSignIn = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-200 shadow-md fixed">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            JS Tiger
          </Link>
        </div>
        <div className="flex-none gap-2">
          {currentUser?.uid ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={currentUser?.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>{currentUser?.displayName}</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <button onClick={handleSignIn}> LogIn</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
