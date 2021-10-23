import { DepositBox } from "../Boxes/DepositBox";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Client } from "../../queryHandlers/clientQuery";
import CreateAccountModal from "./CreateAccountModal";
import CreditBox from "../Boxes/CreditBox";
import { clientModalStyle } from "./modalStyle";

interface Props {
  client: Client;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

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
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={clientModalStyle}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {client.name}
          </Typography>
          <Typography
            id="birthdate-typography-modal-description"
            sx={{ mt: 2 }}
          >
            Дата рождения: {client.birthDate.datePrettier()}
          </Typography>
          <Typography id="passport-typography-modal-description">
            Серия и номер паспорта: {client.passport}
          </Typography>
          <Typography id="email-typography-modal-description">
            E-mail: {client.email}
          </Typography>
          <Typography id="income-typography-modal-description">
            Месячный доход: {client.monthlyIncome.toFixed(2)} руб.
          </Typography>
          <Typography id="phone-typography-modal-description">
            Номер телефона: {client.phone}
          </Typography>
          <Typography id="currentBalance-typography-modal-description">
            Текущий баланс: {client.balance.toFixed(2)} руб.
          </Typography>
          <Typography sx={{ mb: 3 }} id="city-typography-modal-description">
            Город прописки: {client.residence}
          </Typography>
          <CreateAccountModal clientId={client.id} />

          <Typography
            id="creditHeader-typography-modal-description"
            variant="h6"
          >
            {" "}
            Кредитные счета:
            {client.creditAccounts.length ? (
              client.creditAccounts
                .sort((a, b) => {
                  return Number(b.isActive) - Number(a.isActive);
                })
                .map((credit) => (
                  <CreditBox key={credit.id} credit={credit} client={client} />
                ))
            ) : (
              <Typography id="isEmpty-typography-modal-description">
                Отсутствуют
              </Typography>
            )}
          </Typography>
          <Typography
            id="depositHeader-typography-modal-description"
            variant="h6"
          >
            Депозитные счета:
            {client.depositAccounts.length ? (
              client.depositAccounts
                .sort((a, b) => {
                  return Number(b.isActive) - Number(a.isActive);
                })
                .map((deposit) => (
                  <DepositBox
                    key={deposit.id}
                    deposit={deposit}
                    client={client}
                  />
                ))
            ) : (
              <Typography id="isEmpty-typography-modal-description">
                Отсутствуют
              </Typography>
            )}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ClientModal;
