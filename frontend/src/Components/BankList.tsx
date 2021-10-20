import React, { useState } from 'react';
import { Bank } from '../queryHandlers/bankQuery';
import { AccountChart } from '../queryHandlers/accountChart';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Row from "./UI/TableRow"
import AddBankCard from './UI/AddBankCard';
import TablePagination from '@mui/material/TablePagination';
interface Props{
  banks?: Bank[],
  accountCharts?: AccountChart[],
}


const BankList:React.FC<Props> = ({ banks, accountCharts }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{my: 3, maxWidth: "100%"}}>
      <Table aria-label="bank list">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell component="th" scope="row">Bank ID</TableCell>
            <TableCell align="left">Bank Name</TableCell>
            <TableCell align="right">Bank Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {banks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(bank=>(<Row {...bank}/>))}
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
      <AddBankCard></AddBankCard>

    </TableContainer>
  );

};

export default BankList;