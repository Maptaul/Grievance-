import React from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Root = () => {
  const location = useLocation();
  console.log("Location object:", location);
  const noHeaderFooter = location.pathname.includes("login", "signUp");
  return (
    <div className=" bg-base-200 min-h-screen ">
      {noHeaderFooter || (
        <header className="">
          <Navbar />
        </header>
      )}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {noHeaderFooter || (
        <section className="bg-base-200 text-base-content">
          <Footer />
        </section>
      )}
    </div>
  );
};

export default Root;
