import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {
  CreationClientType,
  postBankClient,
} from "../../queryHandlers/clientQuery";
import { Button, TextField } from "@mui/material";
import { style } from "./modalStyle";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  bankId: string;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientModal: React.FC<Props> = ({
  setReload,
  bankId,
  setOpen,
  isOpen,
}) => {
  const [client, setClient] = React.useState<CreationClientType>({
    name: "",
    passport: "",
    birthDate: "",
    phone: "",
    email: "",
    residence: "",
    monthlyIncome: "",
    balance: "",
    bankId: bankId,
  });
  const handleClose = () => setOpen(false);
  const addButtonHandler = async (e: React.MouseEvent): Promise<any> => {
    try {
      const response = await postBankClient(client);
      console.log(response.data);

      setOpen(false);
      setReload(true);
    } catch (e) {}
  };
  return (
    <div>
      <Modal
        aria-labelledby="creation-modal-title"
        aria-describedby="creation-modal-description"
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
              Добавление клиента
            </Typography>
            <TextField
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value! })}
              id="standard-basic"
              label="Имя клиента"
              variant="standard"
            />
            <TextField
              value={client.passport}
              onChange={(e) =>
                setClient({ ...client, passport: e.target.value! })
              }
              id="standard-basic"
              label="Серия и номер паспорта"
              variant="standard"
            />
            <TextField
              value={client.birthDate}
              onChange={(e) =>
                setClient({ ...client, birthDate: e.target.value! })
              }
              id="standard-basic"
              label="Дата рождения"
              variant="standard"
            />
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={client.phone}
              onChange={(e) => setClient({ ...client, phone: e.target.value! })}
              id="standard-basic"
              label="Номер телефона"
              variant="standard"
            />
            <TextField
              value={client.email}
              onChange={(e) => setClient({ ...client, email: e.target.value! })}
              id="standard-basic"
              label="E-mail"
              variant="standard"
            />
            <TextField
              value={client.residence}
              onChange={(e) =>
                setClient({ ...client, residence: e.target.value! })
              }
              id="standard-basic"
              label="Город прописки"
              variant="standard"
            />
            <TextField
              value={client.monthlyIncome}
              onChange={(e) =>
                setClient({ ...client, monthlyIncome: e.target.value! })
              }
              id="standard-basic"
              label="Месячный доход"
              variant="standard"
            />
            <TextField
              value={client.balance}
              onChange={(e) =>
                setClient({ ...client, balance: e.target.value! })
              }
              id="standard-basic"
              label="Начальный баланс"
              variant="standard"
            />
            <Button
              color="success"
              sx={{ my: 3 }}
              variant="contained"
              onClick={(event) => addButtonHandler(event)}
            >
              Добавить
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ClientModal;
