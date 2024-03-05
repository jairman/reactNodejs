import { useState, useEffect } from "react";
import { confirmation, sendRequest } from "../../functions";

import MUIDataTable from "mui-datatables";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
//import moment from 'moment';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 500,
  width: { xs: '90%', sm: '60%', md: '40%' },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const IndexLanguages = () => {
  const [languages, setLanguages] = useState([]);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        setCellProps: () => {
          return { align: "right" };
        },
        width: 10,
      },
    },
    {
      name: "name",
      label: "NAME",
      options: {
        setCellProps: () => {
          return { align: "center" };
        }, // valores de las columnas
      },
    },
    {
      name: "programers",
      label: "PROGRAMERS",
      options: {
        setCellProps: () => {
          return { align: "right" };
        }, // valores de las columnas
      },
    },
    {
      name: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        setCellProps: () => {
          return { align: "center" };
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="left">
              <IconButton
                color="primary"
                aria-label="delete"
                size="small"
                component={Link}
                onClick={() => {
                  handleEdit(tableMeta.rowData);
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
    selectableRows: "none",
    responsive: "standard",
    tableBodyHeight: "100%",
  };

  useEffect(() => {
    return () => {
      getLanguages();
    };
  }, []);

  const getLanguages = async () => {
    const res = await sendRequest("GET", "", "/api/languages", "");
    setLanguages(res.data);
    
  };

  const handleSave = async () => {
    // try {
    //   await axios.put(`API_URL/products/${selectedProductId}`, editedProduct);
    setOpenModal(false);
    //   fetchProducts();
    // } catch (error) {
    //   console.error('Error updating product:', error);
    // }
  };

  const handleEdit = (rowData) => {
    setSelectedProductId(rowData[0]);
    setEditedProduct({
      name: rowData[1],
      programers: rowData[2],
    });
    setOpenModal(true);
  };

  return (
    <>
      <MUIDataTable
        title={"Lista de Lenguages"}
        data={languages}
        columns={columns}
        options={options}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Language
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Name"
            variant="outlined"
            value={editedProduct.name || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, name: e.target.value })
            }
          />

          <TextField
            sx={{ mt: 2 }}
            type="number"
            fullWidth
            label="Programers"
            variant="outlined"
            value={editedProduct.programers || ""}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, programers: e.target.value })
            }
          />

          <Divider sx={{ mt: 2 }} />
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            fullWidth
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};
