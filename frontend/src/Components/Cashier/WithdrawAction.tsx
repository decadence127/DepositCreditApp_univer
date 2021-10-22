import { Button, Box, TextField } from "@mui/material";
import React from "react";
import { withdrawCash } from "../../queryHandlers/clientQuery";
type Props = {
  clientId: string;
  reload: Function;
};
const WithdrawAction: React.FC<Props> = ({ reload, clientId }) => {
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
    console.log(response);
  };
  return (
    <>
      <TextField
        type="number"
        onChange={(e) =>
          setWithdrawalData({
            ...withdrawalData,
            moneyAmount: Number.parseInt(e.target.value),
          })
        }
        placeholder="Введите кол-во денег"
      />
      <TextField
        type="number"
        sx={{ marginTop: 1 }}
        onChange={(e) =>
          setWithdrawalData({ ...withdrawalData, pinCode: e.target.value })
        }
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
