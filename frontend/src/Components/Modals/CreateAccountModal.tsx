import { DatePicker, LocalizationProvider } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  AccountChart,
  fetchAccountCharts,
} from "../../queryHandlers/accountChart";
import { Credit, postCredit } from "../../queryHandlers/creditQuery";
import { Deposit, postDeposit } from "../../queryHandlers/depositQuery";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { creationAccountStyle } from "./modalStyle";

interface Props {
  clientId: string;
}

const CreateAccountModal: React.FC<Props> = ({ clientId }) => {
  let component = null;

  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentDeposit, setCurrentDeposit] = React.useState<Deposit>({
    accountChartId: "",
    depositBalance: "",
    activeBefore: new Date().toString(),
  });
  const [currentCredit, setCurrentCredit] = React.useState<Credit>({
    accountChartId: "",
    creditBalance: "",
    activeBefore: new Date().toString(),
  });

  const [accountCharts, setAccountCharts] = React.useState<AccountChart[]>();
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<string>("");

  const clickHandlerCredit = async () => {
    const data = await fetchAccountCharts();
    setAccountCharts(data);
    setLoading(false);
    setOpen(true);
    setType("Credit");
  };

  const clickHandlerDeposit = async () => {
    const data = await fetchAccountCharts();
    setAccountCharts(data);
    console.log(data);
    setLoading(false);
    setOpen(true);
    setType("Deposit");
  };

  const handleDepositChange = (event: SelectChangeEvent) => {
    setCurrentDeposit({
      ...currentDeposit,
      accountChartId: event.target.value as string,
    });
  };

  const handleCreditChange = (event: SelectChangeEvent) => {
    setCurrentCredit({
      ...currentCredit,
      accountChartId: event.target.value as string,
    });
    console.log(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreditRegistration = (e: React.MouseEvent) => {
    const response = postCredit(currentCredit, clientId);

    console.log(response);
  };
  const handleDepositRegistration = (e: React.MouseEvent) => {
    const response = postDeposit(currentDeposit, clientId);
    console.log(response);
  };
  switch (type) {
    case "Credit": {
      // Extract this component
      component = (
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          {loading ? (
            <LinearProgress />
          ) : (
            <Box sx={{ ...creationAccountStyle }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Оформление кредита
              </Typography>
              <FormControl sx={{ m: 5, width: 300 }}>
                <InputLabel htmlFor="credit-select">
                  Выберите тип кредита
                </InputLabel>
                <Select
                  onChange={handleCreditChange}
                  defaultValue=""
                  id="credit-select"
                  label="Выберите тип кредита"
                >
                  {accountCharts
                    ?.filter((chart) => chart.accountType === 2)
                    .map((chart) => (
                      <MenuItem value={chart.id} key={chart.chartName}>
                        {chart.chartName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Дата окончания кредита"
                  value={currentCredit.activeBefore}
                  onChange={(newValue) => {
                    setCurrentCredit({
                      ...currentCredit,
                      activeBefore: newValue!.toString(),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ width: "300px" }} {...params} />
                  )}
                />
                <TextField
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  sx={{ m: 5, width: 300 }}
                  value={currentCredit.creditBalance}
                  onChange={(e) =>
                    setCurrentCredit({
                      ...currentCredit,
                      creditBalance: e.target.value!,
                    })
                  }
                  id="standard-basic"
                  label="Сумма кредита"
                  variant="outlined"
                />
              </LocalizationProvider>
              <Box display="flex" gap={5}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleCreditRegistration}
                >
                  Оформить
                </Button>
                <Button color="info" variant="contained" onClick={handleClose}>
                  Закрыть
                </Button>
              </Box>
            </Box>
          )}
        </Modal>
      );
      break;
    }
    case "Deposit": {
      // Extract this component
      component = (
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          {loading ? (
            <LinearProgress />
          ) : (
            <Box sx={{ ...creationAccountStyle }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Оформление депозита
              </Typography>
              <FormControl sx={{ m: 5, minWidth: 300 }}>
                <InputLabel htmlFor="deposit-select">
                  Выберите тип депозита
                </InputLabel>
                <Select
                  onChange={handleDepositChange}
                  defaultValue=""
                  id="deposit-select"
                  label="Выберите тип депозита"
                >
                  {accountCharts
                    ?.filter((chart) => chart.accountType === 1)
                    .map((chart) => (
                      <MenuItem value={chart.id} key={chart.chartName}>
                        {chart.chartName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Дата окончания депозита"
                  value={currentDeposit.activeBefore}
                  onChange={(newValue) => {
                    setCurrentDeposit({
                      ...currentDeposit,
                      activeBefore: newValue!.toString(),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ marginBottom: 5, minWidth: "300px" }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                sx={{ mb: 5, width: 300 }}
                value={currentDeposit.depositBalance}
                onChange={(e) =>
                  setCurrentDeposit({
                    ...currentDeposit,
                    depositBalance: e.target.value!,
                  })
                }
                id="standard-basic"
                label="Сумма депозита"
                variant="outlined"
              />
              <Box display="flex" gap={5}>
                <Button
                  color="info"
                  variant="contained"
                  onClick={handleDepositRegistration}
                >
                  Оформить
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleClose}
                >
                  Закрыть
                </Button>
              </Box>
            </Box>
          )}
        </Modal>
      );
      break;
    }
  }

  return (
    <React.Fragment>
      <Box mt={3} display="flex" justifyContent="space-between" gap={3}>
        <Button
          onClick={clickHandlerDeposit}
          variant="contained"
          color="success"
        >
          Добавить депозитный счет
        </Button>
        <Button
          onClick={clickHandlerCredit}
          variant="contained"
          color="success"
        >
          Добавить кредитный счет
        </Button>
      </Box>
      {component}
    </React.Fragment>
  );
};

export default CreateAccountModal;
