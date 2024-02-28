import { Box, Toolbar } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import "../Storage/storage";
import storage from "../Storage/storage";
import Navbar from "./Navbar/Navbar";
import { drawerWidth } from "../Constants";
export const ProtectedRoutes = ({ children }) => {
  const authUser = storage.get("authUser");

  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default ProtectedRoutes;
