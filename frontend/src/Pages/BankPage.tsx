import React, { useEffect, useState } from 'react';
import RouteButton from '../Components/UI/RouteButton';
import { CASHIER_ROUTE } from '../Utils/RouteNames';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { AccountChart, fetchAccountCharts } from '../queryHandlers/accountChart';

const BankPage: React.FC = () => {
  const [accountCharts, setAccountCharts] = useState<AccountChart[]>();

  useEffect(()=>{
    const fetchData = async() =>{
      const charts = await fetchAccountCharts();
      
      setAccountCharts(charts);
    }

    fetchData();
  }, [])

  return (
    <div>
      <div>
        {accountCharts?.map((chart)=>(
          <div key={chart.id}>
          <p>{chart.id}</p>
          <div>{chart.userId}</div>
          <div>{chart.title}</div>
          </div>
        ))}
      </div>
      <RouteButton path={CASHIER_ROUTE}>
          <LocalAtmIcon sx={{fontSize: 48}}/>
      </RouteButton>
    </div>
  );
};

export default BankPage;