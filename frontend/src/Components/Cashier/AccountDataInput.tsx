import {
  CircularProgress,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Client, fetchClient } from "../../queryHandlers/clientQuery";
import MenuContainer from "./MenuContainer";

const AccountDataInput: React.FC = () => {
  const [clientId, setClientId] = React.useState<string>("");
  const [access, setAccess] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [client, setClient] = React.useState<Client>();
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const destroyMenu = () => {
    setAccess(false);
  };

  const fetchHandler = async (id: string): Promise<any> => {
    setTimeout(async () => {
      const data = await fetchClient(id);
      setClient(data);
      setAccess(true);
      setLoading(false);
    }, 1000);
  };
  const reloadData = async (): Promise<any> => {
    const data = await fetchClient(client!.id);
    console.log("data:", data);

    setClient(data);
  };
  const fieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(e.target.value);
    console.log(clientId);
    console.log(clientId?.length);

    if (clientId?.length === 36) {
      setDisabled(true);
      setLoading(true);
      fetchHandler(clientId);
      setClientId("");
      setDisabled(false);
      console.log(access);
    }
  };
  return (
    <React.Fragment>
      {!access ? (
        <>
          {loading ? (
            <CircularProgress sx={{ marginTop: 5 }} />
          ) : (
            <Box my={3}>
              <Typography mb={2}>
                Введите номер счета (
                {typeof clientId === "undefined" ? 36 : 36 - clientId!.length}{" "}
                Символов){" "}
              </Typography>
              <TextField
                autoComplete="true"
                sx={{ width: "280px" }}
                disabled={disabled}
                onChange={fieldHandler}
              ></TextField>
            </Box>
          )}
        </>
      ) : (
        <MenuContainer
          reload={reloadData}
          client={client!}
          exit={destroyMenu}
        />
      )}
    </React.Fragment>
  );
};

export default AccountDataInput;
