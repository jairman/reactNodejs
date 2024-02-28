import Navbar from "./components/Navbar/Navbar";
import { Box, Toolbar} from "@mui/material";
import {  Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";



import { Login } from "./Views/Login/SignInSide";
import { Register } from "./Views/Register/SignUp";

import storage from "./Storage/storage";
import { IndexDepartaments } from "./Views/Departments/IndexDepartaments";
import { CreateDepartaments } from "./Views/Departments/CreateDepartaments";
import { EmployeesIndex } from "./Views/Employees/EmployeesIndex";
import { EditDepartaments } from "./Views/Departments/EditDepartaments";
import { Graphic } from "./Views/Employees/Graphic";

import { drawerWidth } from "./Constants";


function App() {
  const authUser = storage.get("authUser");

  console.log(authUser.id);
  console.log('authUser')
  return (
    <Box sx={{ display: "flex" }}>
      {/*  {storage.get("authUser") ? <Navbar navArrayLinks={navArrayLinks} /> : ""} */}
    
      {authUser && <Navbar />}






      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/departments" element={<IndexDepartaments />}></Route>
            <Route path="/create" element={<CreateDepartaments />}></Route>
            <Route path="/edit/:id" element={<EditDepartaments />}></Route>
            <Route path="/employees" element={<EmployeesIndex />}></Route>
            <Route path="/graphic" element={<Graphic />}></Route>
          </Route>

          <Route path="/*" element={<Navigate to="/login" />}></Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
