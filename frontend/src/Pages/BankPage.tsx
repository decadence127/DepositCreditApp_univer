import React, { useEffect, useState } from "react";
import RouteButton from "../Components/UI/CustomButtons/RouteButton";
import { CASHIER_ROUTE } from "../Utils/RouteNames";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BankList from "../Components/BankList";
import { Bank, fetchBanks } from "../queryHandlers/bankQuery";
import { LinearProgress } from "@mui/material";

const BankPage: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const banks = await fetchBanks();
        setBanks(banks);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [reload]);

  return (
    <React.Fragment>
      {!loading ? (
        <>
          <BankList banks={banks} setReload={setReload} />
          <RouteButton path={CASHIER_ROUTE}>
            <LocalAtmIcon sx={{ fontSize: 48 }} />
          </RouteButton>
        </>
      ) : (
        <LinearProgress />
      )}
    </React.Fragment>
  );
};

export default BankPage;
