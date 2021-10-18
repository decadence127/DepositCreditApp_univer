import React from 'react';
import { useHistory } from 'react-router';
import { BANK_ROUTE } from '../Utils/RouteNames';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RouteButton from '../Components/UI/RouteButton';

const CashierPage: React.FC = () => {
  return (
    <div>
      ATM
      <RouteButton path={BANK_ROUTE}>
        <ArrowBackIcon sx={{fontSize: 48}}/>
      </RouteButton>
    </div>
  );
};

export default CashierPage;