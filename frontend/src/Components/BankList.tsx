import React, { SetStateAction } from "react";
import { Bank } from "../queryHandlers/bankQuery";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Row from "./UI/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
import AddBankButton from "./UI/CustomButtons/AddBankButton";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU
);
interface Props {
  banks?: Bank[];
  setReload: React.Dispatch<SetStateAction<boolean>>;
}

const BankList: React.FC<Props> = ({ banks, setReload }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        component={Paper}
        sx={{
          my: 3,
          minWidth: "1000px",
          maxWidth: "100%",
          ["@media (max-width:1010px)"]: { minWidth: 0 },
        }}
      >
        <Table aria-label="bank list">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell component="th" scope="row">
                ID Банка
              </TableCell>
              <TableCell align="left">Банк</TableCell>
              <TableCell align="right">Текущий баланс банка</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banks
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bank) => (
                <Row key={bank.id} bank={bank} setReload={setReload} />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={banks!.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddBankButton setReload={setReload} />
      </TableContainer>
    </ThemeProvider>
  );
};

export default BankList;
