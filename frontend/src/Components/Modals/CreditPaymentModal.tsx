import { Backdrop, Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import { payCreditDebt } from "../../queryHandlers/creditQuery";
import { CreditPaymentBoxStyle } from "./modalStyle";

interface Props {
  clientId: string;
  creditId: string;
}
const CreditPaymentModal: React.FC<Props> = ({ clientId, creditId }) => {
  const [number, setNumber] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = (e: React.MouseEvent): void => {
    setOpen(true);
  };
  const handleClose = (e: React.MouseEvent): void => {
    setOpen(false);
  };
  const handlePayment = async (e: React.MouseEvent): Promise<any> => {
    try {
      const response = await payCreditDebt(creditId, clientId, number);
      console.log(response.data);

      setOpen(false);
    } catch (e) {}
  };
  return (
    <React.Fragment>
      <Button
        sx={{ ml: 8, mt: 2 }}
        variant="outlined"
        color="success"
        onClick={handleOpen}
      >
        Погасить долг
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...CreditPaymentBoxStyle }}>
          <TextField
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{ mb: 5, width: 300 }}
            value={number}
            onChange={(e) => setNumber(Number.parseInt(e.target.value!))}
            id="standard-basic"
            label="Сумма взноса"
            variant="outlined"
          />
          <Button
            sx={{ width: "200px", marginTop: 2, marginBottom: 2 }}
            onClick={handlePayment}
            variant="contained"
            color="success"
          >
            Внести оплату
          </Button>
          <Button
            sx={{ width: "200px" }}
            onClick={handleClose}
            variant="contained"
            color="success"
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CreditPaymentModal;
