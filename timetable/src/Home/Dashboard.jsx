import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box } from "@mui/material";
import "./AdminDashboard.css";
import Cards from './DashboardCards'

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar is visible by default

  return (
    <Box className="dashboard-container">
      <Header setIsSidebarOpen={setSidebarOpen} />
      <Box className="content-wrapper">
        <Sidebar isOpen={isSidebarOpen} />
        <Box className={`dashboard-content ${isSidebarOpen ? "with-sidebar" : "without-sidebar"}`}>
          <h2>Welcome to Schedulizer- <strong>The Automed TimeTable Generator</strong></h2>
          {/* <p>This is the protected admin area.</p> */}
          <br/>
          <Cards/>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;