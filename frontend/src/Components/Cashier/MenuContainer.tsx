import { Typography } from "@material-ui/core";
import { Box, Button } from "@mui/material";
import React from "react";
import { Client } from "../../queryHandlers/clientQuery";
import DepositAction from "./DepositAction";
import ActionContainer from "./UI/ActionContainer";
import WithdrawAction from "./WithdrawAction";

type Props = {
  client: Client;
  exit: React.Dispatch<React.SetStateAction<boolean>>;
  reload: Function;
};

const MenuContainer: React.FC<Props> = ({ reload, client, exit }) => {
  const [returnPage, setReturnPage] = React.useState<boolean>(false);
  const [actionProps, setActionProps] = React.useState<
    string | React.ReactNode
  >();
  const returnHandler = () => {
    setReturnPage(false);
  };
  const exitHandler = (e: React.MouseEvent) => {
    exit(true);
  };
  const balanceHandler = (e: React.MouseEvent) => {
    setReturnPage(true);
    setActionProps(`Ваш баланс: ${client.balance.toFixed(2)} руб.`);
  };
  const withdrawHandler = (e: React.MouseEvent) => {
    setReturnPage(true);
    setActionProps(
      <WithdrawAction
        exit={returnHandler}
        reload={reload}
        clientId={client.id}
      />
    );
  };
  const depositHandler = (e: React.MouseEvent) => {
    setReturnPage(true);
    setActionProps(
      <DepositAction
        exit={returnHandler}
        reload={reload}
        clientId={client.id}
      />
    );
  };

  return (
    <>
      <Typography>Добро пожаловать, {client.name}</Typography>

      {returnPage ? (
        <ActionContainer exit={returnHandler}>{actionProps}</ActionContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: 2,
            "&& *": {
              margin: 1,
            },
          }}
        >
          <Button onClick={balanceHandler} color="success" variant="contained">
            Проверить баланс
          </Button>
          <Button onClick={withdrawHandler} color="success" variant="contained">
            Снять деньги
          </Button>
          <Button onClick={depositHandler} color="success" variant="contained">
            Пополнить счет
          </Button>
          <Button color="info" variant="contained" onClick={exitHandler}>
            Вернуться
          </Button>
        </Box>
      )}
    </>
  );
};

export default MenuContainer;
