import React from "react";
import Box from "@mui/material/Box";
import { Client, GetCredit } from "../../queryHandlers/clientQuery";
import { Typography } from "@material-ui/core";
import CreditPaymentModal from "../Modals/CreditPaymentModal";
import { Button } from "@mui/material";
import { rechargeCredit } from "../../queryHandlers/creditQuery";
type Props = {
  credit: GetCredit;
  client: Client;
};

const CreditBox: React.FC<Props> = ({ credit, client }) => {
  const rechargeHandler = async (e: React.MouseEvent): Promise<any> => {
    const response = await rechargeCredit(credit.id, client.id);
    console.log(response);
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
        p: 2,
        border: "1px dashed grey",
      }}
    >
      <Typography>
        Номер счета: <span style={{ fontWeight: "bold" }}>{credit.id}</span>
      </Typography>
      <Typography>Тип кредита: {credit.accountChart.chartName}</Typography>
      <Typography>
        Дата окончания: {credit.activeBefore.datePrettier()}
      </Typography>
      <Typography>
        Сумма кредита: {Number.parseFloat(credit.creditBalance).toFixed(2)} руб.
      </Typography>
      <Typography>
        Долг по оплате: {Number.parseFloat(credit.paymentsLeft).toFixed(2)} руб.
      </Typography>
      <Typography>Счет активен: {credit.isActive ? "Да" : "Нет"}</Typography>
      <Button
        onClick={rechargeHandler}
        sx={{ mr: 2, mt: 2 }}
        variant="outlined"
        color="warning"
      >
        Закрыть банковский месяц
      </Button>
      <CreditPaymentModal clientId={client.id} creditId={credit.id} />
    </Box>
  );
};
export default CreditBox;
