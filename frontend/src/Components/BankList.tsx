import React, { useState } from 'react';
import { Bank } from '../queryHandlers/bankQuery';
import { AccountChart } from '../queryHandlers/accountChart';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Row from "./UI/TableRow"
import AddBankCard from './UI/AddBankCard';
interface Props{
  banks?: Bank[],
  accountCharts?: AccountChart[],
}


const BankList:React.FC<Props> = ({ banks, accountCharts }) => {


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
          {banks?.map(bank=>(<Row {...bank}/>))}
        </TableBody>
      </Table>
      <AddBankCard></AddBankCard>
    </TableContainer>
  );

};

export default BankList;