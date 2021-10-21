import BankPage from "./Pages/BankPage";
import CashierPage from "./Pages/CashierPage";
import { BANK_ROUTE, CASHIER_ROUTE } from "./Utils/RouteNames";

export const appRoutes = [
  {
    path: BANK_ROUTE,
    Component: BankPage,
  },
  {
    path: CASHIER_ROUTE,
    Component: CashierPage,
  },
];
