import React from "react";
import { BANK_ROUTE } from "../Utils/RouteNames";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RouteButton from "../Components/UI/CustomButtons/RouteButton";
import ATMContainer from "../Components/Cashier/UI/ATMContainer";

const CashierPage: React.FC = () => {
  return (
    <div>
      <ATMContainer />
      <RouteButton path={BANK_ROUTE}>
        <ArrowBackIcon sx={{ fontSize: 48 }} />
      </RouteButton>
    </div>
  );
};

export default CashierPage;
