import React from "react";
import Box from "@mui/material/Box";
import { Client, GetDeposit } from "../../queryHandlers/clientQuery";
import { Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import {
  rechargeDeposit,
  closeDeposit,
} from "../../queryHandlers/depositQuery";

interface Props {
  deposit: GetDeposit;
  client: Client;
}

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
        p: 2,
        border: "1px dashed grey",
      }}
    >
      <Typography>
        Номер счета: <span style={{ fontWeight: "bold" }}>{deposit.id}</span>
      </Typography>
      <Typography>Тип депозита: {deposit.accountChart.chartName}</Typography>
      <Typography>
        Дата окончания: {deposit.activeBefore.datePrettier()}
      </Typography>
      <Typography>
        Сумма депозита: {Number.parseFloat(deposit.depositBalance).toFixed(2)}{" "}
        руб.
      </Typography>
      <Typography>Счет активен: {deposit.isActive ? "Да" : "Нет"}</Typography>
      <Typography>
        Счет Вклада:{" "}
        <span style={{ fontWeight: "bold" }}>{deposit.interestAccount.id}</span>
      </Typography>
      <Typography>
        Сумма дохода:{" "}
        {Number.parseFloat(deposit.interestAccount.balanceCharge).toFixed(2)}{" "}
        руб.
      </Typography>
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
    </Box>
  );
};
