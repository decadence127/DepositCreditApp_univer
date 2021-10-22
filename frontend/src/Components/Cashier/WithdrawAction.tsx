import { Button, Box, TextField } from "@mui/material";
import React from "react";
import { withdrawCash } from "../../queryHandlers/clientQuery";
type Props = {
  clientId: string;
  reload: Function;
  exit: React.Dispatch<React.SetStateAction<boolean>>;
};
const WithdrawAction: React.FC<Props> = ({ exit, reload, clientId }) => {
  const [withdrawalData, setWithdrawalData] = React.useState({
    pinCode: "",
    moneyAmount: 0,
  });
  const withdrawHandler = async (e: React.MouseEvent): Promise<any> => {
    const response = await withdrawCash(
      withdrawalData.pinCode,
      withdrawalData.moneyAmount,
      clientId
    );
    reload();
    exit(true);
    console.log(response);
  };
  return (
    <>
      <TextField
        required={true}
        type="number"
        onChange={(e) => {
          e.target.value[0] === "-"
            ? (e.target.value = "")
            : setWithdrawalData({
                ...withdrawalData,
                moneyAmount: Number.parseInt(e.target.value),
              });
        }}
        placeholder="Введите кол-во денег"
      />
      <TextField
        required={true}
        type="number"
        sx={{ marginTop: 1 }}
        onChange={(e) => {
          e.target.value[0] === "-"
            ? (e.target.value = "")
            : e.target.value.length > 4
            ? (e.target.value = e.target.value.slice(0, 4))
            : setWithdrawalData({ ...withdrawalData, pinCode: e.target.value });
        }}
        placeholder="Введите PIN-код"
      />
      <Button
        sx={{ marginTop: 3 }}
        onClick={withdrawHandler}
        variant="contained"
        color="success"
      >
        Снять деньги
      </Button>
    </>
  );
};

export default WithdrawAction;
