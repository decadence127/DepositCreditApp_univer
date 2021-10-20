import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Client } from '../../queryHandlers/clientQuery';

interface Props{
  client: Client,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isOpen: boolean
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

const ClientModal: React.FC<Props> = ({client, setOpen, isOpen}) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
            {client.name}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Дата рождения: {client.birthDate}
            </Typography>
            <Typography id="transition-modal-description">
              Серия и номер паспорта: {client.passport}
            </Typography>
            <Typography id="transition-modal-description">
              E-mail: {client.email}
            </Typography>
            <Typography id="transition-modal-description">
              Месячный доход: {client.monthlyIncome}
            </Typography>
            <Typography id="transition-modal-description">
              Номер телефона: {client.phone}
            </Typography>
            <Typography id="transition-modal-description">
              Текущий баланс: {client.balance}
            </Typography>
            <Typography id="transition-modal-description">
              Город прописки: {client.residence}
            </Typography>
            <Typography id="transition-modal-description">
              Кредитные счета: {client.creditAccounts.length || <Typography id="transition-modal-description">Отсутствуют</Typography>}
            </Typography>
            <Typography id="transition-modal-description">
              Депозитные счета: {client.depositAccounts.length || <Typography id="transition-modal-description">Отсутствуют</Typography>}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ClientModal;