import { Box } from '@mui/system';
import React, { SetStateAction, useState } from 'react';
import classes from "./bankCard.module.css";
import BankCreateCard from './BankCreateCard';
interface Props{
  setReload: React.Dispatch<SetStateAction<boolean>>
}
const AddBankCard:React.FC<Props> = ({setReload}) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const clickHandler = () =>{
     setOpenAddModal(!openAddModal)
  }
  return (
    <>
    <Box className={classes.bankBox} onClick={clickHandler}>
      <p>Добавить банк</p>
  </Box>
  {openAddModal && <BankCreateCard setReload={setReload}isOpen={openAddModal} setOpen={setOpenAddModal}/>}
  </>
  );
};

export default AddBankCard;