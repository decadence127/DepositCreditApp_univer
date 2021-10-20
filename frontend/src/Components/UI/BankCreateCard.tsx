import { Paper, Box } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createBank } from '../../queryHandlers/bankQuery';

export type IBankCreationType = {
  BankTitle: string;
  Balance: number;

}

const BankCreateCard: React.FC = () => {
  const [bankTitle, setBankTitle] = useState<string>();
  const [bankBalance, setBankBalance] = useState<number>();
  const clickHandler = () =>{
    const response = createBank({BankTitle: bankTitle!, Balance: bankBalance!});
    console.log(response);
    
  }


  return (
  <>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        p: 3,
      },
    }}>
    <Paper elevation={3}>
    <TextField value={bankTitle}onChange={e=> setBankTitle(e.target.value!)} id="standard-basic" label="Название банка" variant="standard"/>
    <TextField value={bankBalance} onChange={e=> setBankBalance(e.target.value! as unknown as number)}id="standard-basic" label="Текущий баланс банка" variant="standard"/>
    <Button variant="contained" onClick={clickHandler}>Добавить</Button>
    </Paper>
    </Box>
    </>
  );
};

export default BankCreateCard;