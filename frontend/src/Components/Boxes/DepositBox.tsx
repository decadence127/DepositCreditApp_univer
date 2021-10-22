import React from "react";
import Box from "@mui/material/Box";
import { Client, GetDeposit } from "../../queryHandlers/clientQuery";
import { Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import {
  rechargeDeposit,
  closeDeposit,
} from "../../queryHandlers/depositQuery";

type Props = {
  deposit: GetDeposit;
  client: Client;
};

export const DepositBox: React.FC<Props> = ({ deposit, client }) => {
  const rechargeHandler = async (e: React.MouseEvent) => {
    const response = await rechargeDeposit(deposit.id, client.id);
    console.log(response);
  };
  const closeDepositHandler = async (e: React.MouseEvent) => {
    const response = await closeDeposit(deposit.id, client.id);
    console.log(response);
  };
  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
        p: 2,
        border: deposit.isActive ? "1px dashed black" : "1px dashed grey",
      }}
    >
      <Typography color={deposit.isActive ? "textPrimary" : "textSecondary"}>
        Номер счета: <span style={{ fontWeight: "bold" }}>{deposit.id}</span>
      </Typography>
      <Typography color={deposit.isActive ? "textPrimary" : "textSecondary"}>
        Тип депозита: {deposit.accountChart.chartName}
      </Typography>
      <Typography color={deposit.isActive ? "textPrimary" : "textSecondary"}>
        Дата окончания: {deposit.activeBefore.datePrettier()}
      </Typography>
      <Typography color={deposit.isActive ? "textPrimary" : "textSecondary"}>
        Сумма депозита: {Number.parseFloat(deposit.depositBalance).toFixed(2)}{" "}
        руб.
      </Typography>
      <Typography color={deposit.isActive ? "textPrimary" : "textSecondary"}>
        Счет активен: {deposit.isActive ? "Да" : "Нет"}
      </Typography>
      <Typography color={deposit.isActive ? "textPrimary" : "textSecondary"}>
        Счет вклада:{" "}
        <span style={{ fontWeight: "bold" }}>{deposit.interestAccount.id}</span>
      </Typography>
      <Typography color={deposit.isActive ? "textPrimary" : "textSecondary"}>
        Сумма дохода:{" "}
        {Number.parseFloat(deposit.interestAccount.balanceCharge).toFixed(2)}{" "}
        руб.
      </Typography>
      {deposit.isActive && (
        <>
          <Button
            onClick={rechargeHandler}
            sx={{ mr: 2, mt: 2 }}
            variant="outlined"
            color="warning"
          >
            Закрыть банковский месяц
          </Button>
          <Button
            onClick={closeDepositHandler}
            sx={{ ml: 8, mt: 2 }}
            variant="outlined"
            color="error"
          >
            Закрыть депозит
          </Button>
        </>
      )}
    </Box>
  );
};
