import {Button, Box, TextField} from "@mui/material";
import React from "react";
import {appendCash} from "../../queryHandlers/clientQuery";

type Props = {
  clientId: string;
  reload: Function;
  exit: React.Dispatch<React.SetStateAction<boolean>>;
};
const DepositAction: React.FC<Props> = ({ exit, reload, clientId }) => {
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
    exit(true);
    console.log(response);
  };
  return (
    <>
      <TextField
        type="number"
        InputProps={{
          inputProps: {
            min: 1,
          },
        }}
        onChange={(e) => {
          e.target.value[0] === "-"
            ? (e.target.value = "")
            : setDepositingData({
                ...depositingData,
                moneyAmount: Number.parseInt(e.target.value),
              });
        }}
        placeholder="Введите кол-во денег"
      />
      <TextField
        type="number"
        sx={{ marginTop: 1 }}
        onChange={(e) => {
          e.target.value[0] === "-"
            ? (e.target.value = "")
            : e.target.value.length > 4
            ? (e.target.value = e.target.value.slice(0, 4))
            : setDepositingData({ ...depositingData, pinCode: e.target.value });
        }}
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
