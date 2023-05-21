import React from "react";
import Navbar from "./Navbar";

import Footer from "./Footer";

const Dashboard = ({ children }) => {
  return (
    <div className="relative min-h-[90vh]">
      <Navbar />
      <div className="flex flex-row bg-white">{children}</div>
    </div>
  );
};

export default Dashboard;
