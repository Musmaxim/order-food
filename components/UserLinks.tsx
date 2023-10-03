"use client";

import Link from "next/link";
import { useSession,signOut } from "next-auth/react";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">Orders</Link>
          <span className="ml-4 cursor-pointer" onClick={()=>signOut()}>Logout</span>
        </div>
      ) : (
        <Link href="/profile">Login</Link>
      )}
    </>
  );
};

export default UserLinks;
