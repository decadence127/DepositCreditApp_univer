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
        border: credit.isActive ? "1px dashed black" : "1px dashed grey",
      }}
    >
      <Typography color={credit.isActive ? "textPrimary" : "textSecondary"}>
        Номер счета: <span style={{ fontWeight: "bold" }}>{credit.id}</span>
      </Typography>
      <Typography color={credit.isActive ? "textPrimary" : "textSecondary"}>
        Тип кредита: {credit.accountChart.chartName}
      </Typography>
      <Typography color={credit.isActive ? "textPrimary" : "textSecondary"}>
        Дата окончания: {credit.activeBefore.datePrettier()}
      </Typography>
      <Typography color={credit.isActive ? "textPrimary" : "textSecondary"}>
        Сумма кредита: {Number.parseFloat(credit.creditBalance).toFixed(2)} руб.
      </Typography>
      <Typography color={credit.isActive ? "textPrimary" : "textSecondary"}>
        Долг по оплате: {Number.parseFloat(credit.paymentsLeft).toFixed(2)} руб.
      </Typography>
      <Typography color={credit.isActive ? "textPrimary" : "textSecondary"}>
        Счет активен: {credit.isActive ? "Да" : "Нет"}
      </Typography>
      {credit.isActive && (
        <>
          {" "}
          <Button
            onClick={rechargeHandler}
            sx={{ mr: 2, mt: 2 }}
            variant="outlined"
            color="warning"
          >
            Закрыть банковский месяц
          </Button>
          <CreditPaymentModal clientId={client.id} creditId={credit.id} />
        </>
      )}
    </Box>
  );
};
export default CreditBox;
