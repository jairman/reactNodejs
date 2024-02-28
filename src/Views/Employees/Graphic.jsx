import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// export const Graphic = () => {
export class Graphic extends React.Component {
  render() {
    const columns = ["Nombre", "Empresa", "Ciudad", "Estado"];
    const data = [
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"],
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"],
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"],
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"],
    ];
    const options = { filterType: "checkbox" };

    return (
      <ThemeProvider theme={darkTheme}>
        <MUIDataTable
          title={"Lista de empleados"}
          data={data}
          columns={columns}
          options={{ 
            selectableRows: false,
              rowHover: false,
              filter: false,
              print: false,
              download: false,
              responsive: "scroll",
           }}
        />
      </ThemeProvider>
    );
  }
}
