import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Root = () => {
  return (
    <div className=" bg-base-200 min-h-screen ">
      <header className="">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <section className="bg-base-200 text-base-content">
        <Footer />
      </section>
    </div>
  );
};

export default Root;
