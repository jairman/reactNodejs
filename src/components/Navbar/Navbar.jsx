import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import storage from "../../Storage/storage";


import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";


import { drawerWidth } from "../../Constants";

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navArrayLinksLogout = [
    {
      title: "Logout",
      path: "/logout",
      icon: <LogoutIcon />,
    },
  ];


  const navArrayLinks = [
    {
      title: "Languages",
      path: "/languages",
      icon: <PeopleAltIcon />,
    },
    {
      title: "Departments",
      path: "/languages2",
      icon: <AccountBalanceIcon />,
    },
    {
      title: "Graphic",
      path: "/graphic",
      icon: <LeaderboardIcon />,
    },
  ];


  

  const go = useNavigate();
  const logout = async () => {
    storage.remove("authToken");
    storage.remove("authUser");
    await axios.get("/auth/logout", storage.get("authToken"));
    go("/login");
 
  
  };

  const drawer = (
    <div  >
      <Toolbar />  {/* espacio en blanco de arriba */ }     
      <Divider />
      <List>
              {navArrayLinks.map((item) => (
                <ListItem
                  key={item.title}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    component={NavLink}
                    to={item.path}
                   
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

      

      <Divider />

      <List >
        {navArrayLinksLogout.map((item) => (
          <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              component={NavLink}
              to={item.path}
              onClick={logout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    < >
    
      <AppBar
        style={{ background: '#fff' }} // Color del navBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="#f8f9fe"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="#000" variant="h6" noWrap component="div">
            Tokin
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
     
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
       
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#f0f2f5", // Color Panel izquierdo
             
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
        
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#f0f2f5", // Color Panel izquierdo
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
