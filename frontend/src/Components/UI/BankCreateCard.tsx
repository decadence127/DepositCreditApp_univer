import { Paper, Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createBank } from '../../queryHandlers/bankQuery';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';


interface Props{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean
  setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};


const BankCreateCard: React.FC<Props> = ({setReload, setOpen, isOpen}) => {
  const [bankTitle, setBankTitle] = useState<string>();
  const [bankBalance, setBankBalance] = useState<number>();
  const clickHandler = () =>{
    const response = createBank({BankTitle: bankTitle!, Balance: bankBalance!});
    console.log(response);
    setReload(true);
    
  }
  const handleClose = () => setOpen(false);
  return (
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={isOpen}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={isOpen}>
    <Box sx={style}>

    <Paper elevation={3}  sx={{
      display: 'flex',
      flexDirection:"column",
      justifyContent: 'center',
      padding: 5}}>
    <Typography variant="h6" component="h2">Введите данные</Typography>
    <TextField value={bankTitle}onChange={e=> setBankTitle(e.target.value!)} id="standard-basic" label="Название банка" variant="standard"/>
    <TextField  type="number" value={bankBalance} onChange={e=> setBankBalance(Number(e.target.value!))}id="standard-basic" label="Текущий баланс банка" variant="standard"/>
    <Button sx={{marginTop: 5}} variant="contained" onClick={clickHandler}>Добавить</Button>
    </Paper>
    </Box>
    </Fade>
    </Modal>
  );
};

export default BankCreateCard;