import React from "react";
import Navbar from "./Navbar";

import Footer from "./Footer";

const Dashboard = ({ children }) => {
  return (
    <>
      <div className="relative">
        <div className="fixed top-0 right-0 left-0 z-10">
          {" "}
          <Navbar />
        </div>

        <div className="bg-white min-h-[70vh] py-24">{children}</div>
        <div className="fixed bottom-0 right-0 left-0 z-10">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
