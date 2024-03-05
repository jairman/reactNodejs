import { Box} from "@mui/material";
import {  Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";

import { Login } from "./Views/Login/SignInSide";
import { Register } from "./Views/Register/SignUp";

//import { IndexDepartaments } from "./Views/Departments/IndexDepartaments";
import { CreateDepartaments } from "./Views/Departments/CreateDepartaments";
import { EmployeesIndex } from "./Views/Employees/EmployeesIndex";
import { EditDepartaments } from "./Views/Departments/EditDepartaments";
import { Graphic } from "./Views/Employees/Graphic";

import { IndexLanguages} from './Views/Languajes/IndexLanguages'




function App() {

  return (
    <Box sx={{ display: "flex" }}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/languages" element={<IndexLanguages />}></Route>
            <Route path="/create" element={<CreateDepartaments />}></Route>
            <Route path="/edit/:id" element={<EditDepartaments />}></Route>
            <Route path="/languages2" element={<EmployeesIndex />}></Route>
            <Route path="/graphic" element={<Graphic />}></Route>
          </Route>

          <Route path="/*" element={<Navigate to="/login" />}></Route>
        </Routes>
      </Box>
   
  );
}

export default App;
