import React, { useEffect, useState } from 'react';
import RouteButton from '../Components/UI/RouteButton';
import { CASHIER_ROUTE } from '../Utils/RouteNames';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { AccountChart, fetchAccountCharts } from '../queryHandlers/accountChart';
import BankList from '../Components/BankList';
import { Bank, fetchBanks } from '../queryHandlers/bankQuery';
import { LinearProgress } from '@mui/material';
import { ServerError } from '../apiService/errorHandler/ErrorResponse';


const BankPage: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>();
  const [accountCharts, setAccountCharts] = useState<AccountChart[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState(false);

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const charts = await fetchAccountCharts();
        const banks = await fetchBanks();
        setAccountCharts(charts);
        setBanks(banks)
        setLoading(false)
      }catch(error){
        console.log(error);
      }
    }

    fetchData();
  }, [reload])

  return (
    <React.Fragment>
    {!loading ?<>
      <BankList banks={banks} accountCharts={accountCharts} setReload={setReload} />
      <RouteButton path={CASHIER_ROUTE}>
          <LocalAtmIcon sx={{fontSize: 48}}/>
      </RouteButton>
    </> : <LinearProgress />}
    </React.Fragment>
  );
};

export default BankPage;

function AxiosError<T>() {
  throw new Error('Function not implemented.');
}
