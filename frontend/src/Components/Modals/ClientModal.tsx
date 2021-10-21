import { DepositBox } from "../Boxes/DepositBox";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Client } from "../../queryHandlers/clientQuery";
import CreateAccountModal from "./CreateAccountModal";
interface Props {
  client: Client;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "600px",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ClientModal: React.FC<Props> = ({
  setReload,
  client,
  setOpen,
  isOpen,
}) => {
  const handleClose = () => {
    setOpen(false);
    setReload(true);
  };

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
            <Typography sx={{ mb: 3 }} id="transition-modal-description">
              Город прописки: {client.residence}
            </Typography>
            <Typography id="transition-modal-description">
              Кредитные счета:{" "}
              {client.creditAccounts.length ? (
                "helo"
              ) : (
                <Typography id="transition-modal-description">
                  Отсутствуют
                </Typography>
              )}
            </Typography>
            <Typography id="transition-modal-description">
              Депозитные счета:
              {client.depositAccounts.length ? (
                client.depositAccounts.map((deposit) => (
                  <DepositBox deposit={deposit} />
                ))
              ) : (
                <Typography id="transition-modal-description">
                  Отсутствуют
                </Typography>
              )}
            </Typography>
            <CreateAccountModal clientId={client.id} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ClientModal;
