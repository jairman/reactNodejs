import { useState, useEffect } from "react";
import { confirmation, sendRequest } from "../../functions";

import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
//import moment from 'moment';
import Box from '@mui/material/Box';



const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      setCellProps: () => { return { align: "right" } },
      width: 10
    },
   
  },
  {
    name: "name",
    label: "NAME",
    options: {
      setCellProps: () => { return { align: "center" } }, // valores de las columnas
      
    },
 
  },
  {
    name: "programers",
    label: "PROGRAMERS",
  
    options: {
      //setCellHeaderProps: () => { return { align: "right" } },
      setCellProps: () => { return { align: "right" } }, // valores de las columnas
      //setCellHeaderProps: () => { return { style: {textAlign: 'right' }}}
    },

    
  },
  {
    name: "Action",
    options: {
      filter: false,
      sort: false,
      empty: true,
      setCellProps: () => { return { align: "center" } }, 
      customBodyRender: (value, tableMeta, updateValue) => {
       
        
        return (
          <Box alignItems="left">
            <IconButton
              color="primary"
              aria-label="delete"
              size="small"
              component={Link} 
              //to={"/edit/" + tableMeta.rowData[0]}
              //onClick={()=>{editItem(tableMeta.rowData[0])}}

              //onClick={() => navigate('/addUser')}
              
              onClick={(e) => {
                e.stopPropagation();
                window.alert(tableMeta.rowData[0]);
                console.log(tableMeta.rowData[0]);
              }}
              
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
       
          </Box>
        );
      },
    },
  },
];


const options = {
  selectableRows: 'none',
  responsive: "standard",
  tableBodyHeight: "100%",

  

  customHeadRender: (columnMeta, handleToggleColumn) => {
    return (
      <th key={columnMeta.index} style={{ width: columnMeta.options.width }}>
        {columnMeta.label}
      </th>
    );
  },
  customBodyRender: (value, tableMeta, updateValue) => {
    return (
      <td key={tableMeta.columnIndex} style={{ width: tableMeta.columnData.options.width }}>
        {value}
      </td>
    );
  }
   
   

}

export const IndexLanguages = () => {
  const [languages, setLanguages] = useState([]);

  

  useEffect(() => {
    return () => {
      getLanguages();
    };
  }, []);

  const getLanguages = async () => {
    const res = await sendRequest("GET", "", "/api/languages", "");
    setLanguages(res.data);
    console.log(res.data);
  };

  return (
    <MUIDataTable
      title={"Lista de Lenguages"}
      data={languages}
      columns={columns}
      options={ options}
    />
  );
};
