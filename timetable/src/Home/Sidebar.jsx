import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import PsychologyIcon from '@mui/icons-material/Psychology';
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"; 
import ListAltIcon from '@mui/icons-material/ListAlt';

const Sidebar = ({ isOpen }) => {
  return (
    <Drawer
      variant="persistent"
      open={isOpen} 
      sx={{
        width: isOpen ? 240 : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: isOpen ? 240 : 0,
          boxSizing: "border-box",
          backgroundColor: "#2e5266",  // Sidebar Background
          color: "#D9D9D9",
          top: "64px",  // Prevents overlap with header
        },
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItem 
          button 
          component={NavLink} 
          to="/Home" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#6e8898" },  
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, // Bold text on hover
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><HomeIcon/></ListItemIcon>
          <ListItemText primary="Home" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>
        <Divider sx={{ backgroundColor: "#D9D9D9" }} />

        {/* Students */}
        <ListItem 
          button 
          component={NavLink} 
          to="/Students" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#6e8898" },
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, 
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Students" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>
        <Divider sx={{ backgroundColor: "#D9D9D9" }} />

        {/* Teachers */}
        <ListItem 
          button 
          component={NavLink} 
          to="/Teachers" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#6e8898" },
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, 
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><PsychologyIcon /></ListItemIcon>
          <ListItemText primary="Teachers" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>
        <Divider sx={{ backgroundColor: "#D9D9D9" }} />

        {/* Courses */}
        <ListItem 
          button 
          component={NavLink} 
          to="/Courses" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#6e8898" },
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, 
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><ListAltIcon /></ListItemIcon>
          <ListItemText primary="Courses" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>
        <Divider sx={{ backgroundColor: "#D9D9D9" }} />

        {/* Schedules */}
        {/* <ListItem 
          button 
          component={NavLink} 
          to="/Schedules" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#6e8898" },
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, 
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><AssignmentIndIcon /></ListItemIcon>
          <ListItemText primary="Schedules" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem> */}

        <Divider sx={{ backgroundColor: "#D9D9D9" }} />

        {/*TimeTables */}
        <ListItem 
          button 
          component={NavLink} 
          to="/Timeslots" 
          sx={{
            color: "#D9D9D9",
            "&:hover": { backgroundColor: "#6e8898"},
            "&:hover .MuiListItemText-primary": { fontWeight: "bold" }, 
            "&.active-link": { backgroundColor: "#1E1E1E", fontWeight: "bold" }
          }}
        >
          <ListItemIcon sx={{ color: "#D9D9D9" }}><EventNoteIcon/></ListItemIcon>
          <ListItemText primary="TimeTables" sx={{ transition: "font-weight 0.3s ease" }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;