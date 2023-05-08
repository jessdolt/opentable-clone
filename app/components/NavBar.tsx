"use client";
import Link from "next/link";
import React from "react";
import useAuth from "../../hooks/useAuth";
import AuthModal from "./AuthModal";

const NavBar = () => {
  const { data, loading, signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button
                className="bg-blue-400 py-2 px-4 text-white rounded"
                onClick={() => signout()}
              >
                Logout
              </button>
            ) : (
              <>
                <AuthModal isSignin />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
