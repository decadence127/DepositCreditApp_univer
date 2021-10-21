import React from "react";
import Box from "@mui/material/Box";
import { GetDeposit } from "../../queryHandlers/clientQuery";
import { Typography } from "@material-ui/core";
interface Props {
  deposit: GetDeposit;
}

export const DepositBox: React.FC<Props> = ({ deposit }) => {
  return (
    <Box sx={{ p: 2, border: "1px dashed grey" }}>
      <Typography>
        {" "}
        <span style={{ fontWeight: "normal" }}>Номер счета:</span>
        {deposit.id}
      </Typography>
      <Typography>Дата окончания: {deposit.activeBefore}</Typography>
      <Typography>Сумма депозита: {deposit.depositBalance}</Typography>
      <Typography>Тип депозита: {deposit.accountChart.chartName}</Typography>
      <Typography>Счет активен: {deposit.isActive ? "Да" : "Нет"}</Typography>
    </Box>
  );
};
