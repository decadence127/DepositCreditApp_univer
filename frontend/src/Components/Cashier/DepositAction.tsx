import { Button, Box, TextField } from "@mui/material";
import React from "react";
import { appendCash } from "../../queryHandlers/clientQuery";

type Props = {
  clientId: string;
  reload: Function;
};
const DepositAction: React.FC<Props> = ({ reload, clientId }) => {
  const [depositingData, setDepositingData] = React.useState({
    pinCode: "",
    moneyAmount: 0,
  });
  const depositHandler = async (e: React.MouseEvent): Promise<any> => {
    const response = await appendCash(
      depositingData.pinCode,
      depositingData.moneyAmount,
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
          setDepositingData({
            ...depositingData,
            moneyAmount: Number.parseInt(e.target.value),
          })
        }
        placeholder="Введите кол-во денег"
      />
      <TextField
        type="number"
        sx={{ marginTop: 1 }}
        onChange={(e) =>
          setDepositingData({ ...depositingData, pinCode: e.target.value })
        }
        placeholder="Введите PIN-код"
      />
      <Button
        sx={{ marginTop: 3 }}
        onClick={depositHandler}
        variant="contained"
        color="success"
      >
        Пополнить баланс
      </Button>
    </>
  );
};

export default DepositAction;
