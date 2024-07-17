import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const columns = [
  {
    id: "image",
    label: "Logo",
    minWidth: 80,
    format: (value) => <img src={value} />,
  },
  { id: "name", label: "Name", minWidth: 80 },
  { id: "code", label: "Code", minWidth: 40 },
  {
    id: "rank",
    label: "Rank",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
    align: "right",
    format: (value) => {
      const date = new Date(parseInt(value));
      date.setHours(date.getHours() + 5);
      date.setMinutes(date.getMinutes() + 30);
      return date.toISOString();
    },
    child: true,
  },
  {
    id: "rate",
    label: "Price",
    minWidth: 120,
    align: "right",
    format: (value) => `$ ${value.toFixed(5)}`,
    child: true,
  },
];

const CustomTable = ({ data, error }) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!data?.history ? (
              <TableRow align="center">
                <h4>{error ? error : "Network Error!"}</h4>
              </TableRow>
            ) : (
              data?.history?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = column?.child
                        ? row[column.id]
                        : data[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default CustomTable;
