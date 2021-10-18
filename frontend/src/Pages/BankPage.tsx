import React from 'react';
import RouteButton from '../Components/UI/RouteButton';
import { CASHIER_ROUTE } from '../Utils/RouteNames';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const BankPage: React.FC = () => {
  return (
    <div>
      BankPage
      <RouteButton path={CASHIER_ROUTE}>
          <LocalAtmIcon sx={{fontSize: 48}}/>
      </RouteButton>
    </div>
  );
};

export default BankPage;