import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,

} from "@mui/material";
import MUIDataTable from "mui-datatables";
//import users from "./empl.json";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "../../App";
import { useEffect, useState } from "react";
import { confirmation, sendRequest } from "../../functions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//--------Tabla
const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "name",
    label: "NAME",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "EMAIL",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "phone",
    label: "PHONE",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "department",
    label: "DEPARTMENT",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Action",
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            <IconButton
              color="primary"
              aria-label="delete"
              size="small"
              title="Edit"
      
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="delete"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                window.alert("EDIT");
                console.log(e.target.value);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  },
];

const options = {
  selectableRows: false,
  responsive: "standard",
  tableBodyHeight: "100%",
};

export const EmployeesIndex = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);

  const clear = () => {
    setDatos("");
   
  };
 
  const handleOpen = () => {
    setOpen(true)
   
  };
  const handleClose = () => setOpen(false);

  const [datos, setDatos] = useState({
    name: "",
    email: "",
    phone: "",
    //department_id: "",
  });



  function addDepartment(event) { 
    setDatos({...datos, [event.target.name]: event.target.value})
  }

  const handleChange = (e) => {
   
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


    const res = await sendRequest("POST", datos, "/api/employee", "");
    getEmployees(1);
    console.log(res);
    clear()
    handleClose(); // Cierra el modal
  };

  useEffect(() => {
    getEmployees(1);
    getDepartments();
  }, []);

  const getEmployees = async () => {
    const res = await sendRequest("GET", "", "/api/employee?page=", "");

    setEmployees(res);
  };

  const getDepartments = async () => {
    const res = await sendRequest("GET", "", "/api/departaments", "");
    setDepartments(res);
   
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>ADD EMPLOYEES</h3>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={datos.name}
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={datos.email}
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  label="Phone"
                  name="phone"
                  value={datos.phone}
                  required
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="department_id"
                  //value={datos.department_id}
                  options={departments}
                  multiple={false}
                  getOptionLabel={(option) => (option ? option.name : "")}

                  onChange={(event, newVal) => addDepartment({ target: { value: newVal.id, name: 'department_id' } })}
                  required
                  renderInput={(params) => <TextField {...params} label="Departments" 
                  name="department_id"  
                  />}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <br />
      <Button onClick={handleOpen}>ADD Employees</Button>
      <br />

      <MUIDataTable
        title={"Lista de Employees"}
        data={employees}
        columns={columns}
        options={options}
      />
    </>
  );
};
