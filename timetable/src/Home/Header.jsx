import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logoImage from "../Images/pngtree-time-clock-schedule-vector-png-image_15861573.png";

const Header = ({ setIsSidebarOpen }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#16324f", zIndex: 1300 }}>
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton 
          edge="start" 
          color="inherit" 
          onClick={() => setIsSidebarOpen(prev => !prev)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <h3>
            Schedulizer
        </h3>
        {/* Rectangle Image Logo */}
        <Box
          component="img"
          src={logoImage}  
          alt="Logo"
          sx={{
            width: 100,  
            height: 40,  
            objectFit: "contain",
            paddingRight:5,
            mr: "auto",  // Push profile icon to the right
          }}
        />
        

        {/* Profile Icon */}
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}; 

export default Header;