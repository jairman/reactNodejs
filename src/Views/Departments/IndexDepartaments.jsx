import { useEffect, useState } from "react";

import { confirmation, sendRequest } from "../../functions";

import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import moment from 'moment';




const columns = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "name",
    label: "NAME",
  },
  {
    name: "created_at",
    label: "DATE",
    options: {
      customBodyRender: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
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
              component={Link} 
              to={"/edit/" + tableMeta.rowData[0]}
              //onClick={()=>{editItem(tableMeta.rowData[0])}}

              //onClick={() => navigate('/addUser')}
              
              // onClick={(e) => {
              //   e.stopPropagation();
              //   window.alert(tableMeta.rowData[0]);
              //   console.log(tableMeta.rowData[0]);
              // }}
              
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
}

//const go = useNavigate();

// const editItem = (id) =>{

//   const navigate = useNavigate();
//   navigate(`/userProfile?id=${id}`);

//   alert(id);
//   //go("/edit/" + id);
// }



export const IndexDepartaments = () => {
  const [departments, setDepartments] = useState([]);

  
  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    const res = await sendRequest("GET", "", "/api/languages", "");
    console.log(res.data);
    setDepartments(res);
  };



  return (
    <MUIDataTable
      title={"Lista de Departamentos"}
      data={departments}
      columns={columns}
      options={ options}
    />
  );
};
