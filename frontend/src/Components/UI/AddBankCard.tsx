import { Box } from '@mui/system';
import React, { useState } from 'react';
import classes from "./bankCard.module.css";
import BankCreateCard from './BankCreateCard';

const AddBankCard:React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const clickHandler = () =>{
     setOpenAddModal(!openAddModal)
  }
  return (
    <>
    <Box className={classes.bankBox} onClick={clickHandler}>
      <p>Добавить</p>
  </Box>
  {openAddModal && <BankCreateCard/>}
  </>
  );
};

export default AddBankCard;