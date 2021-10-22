import axios, { AxiosError } from "axios";
import { ServerError } from "../apiService/errorHandler/ErrorResponse";
import { http } from "../apiService/useAxios";
import { BASE_URL, CLIENT } from "../Utils/ApiRoutes";
import { AccountChart } from "./accountChart";

export type CreationClientType = {
  name: string;
  passport: string;
  birthDate: string;
  phone: string;
  email: string;
  residence: string;
  monthlyIncome: string;
  balance: string;
  bankId: string;
};
type InterestAccount = {
  id: string;
  balanceCharge: string;
};
export type GetDeposit = {
  accountChart: AccountChart;
  isActive: boolean;
  activeBefore: string;
  id: string;
  depositBalance: string;
  interestAccount: InterestAccount;
};
export type GetCredit = {
  id: string;
  creditBalance: string;
  isActive: boolean;
  activeBefore: string;
  paymentsLeft: string;
  accountChart: AccountChart;
};
export type Client = {
  id: string;
  name: string;
  passport: string;
  birthDate: string;
  phone: string;
  email: string;
  residence: string;
  monthlyIncome: number;
  balance: number;
  depositAccounts: GetDeposit[];
  creditAccounts: GetCredit[];
};

export const fetchBankClients = async (
  id: string | undefined
): Promise<any> => {
  try {
    const { data } = await http.get<Client[]>(BASE_URL + id + CLIENT);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      http.handleError(serverError);
    }
  }
};
export const postBankClient = async (
  client: CreationClientType
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("Name", client.name);
    formData.append("Passport", client.passport);
    formData.append("BirthDate", client.birthDate);
    formData.append("Phone", client.phone);
    formData.append("Email", client.email);
    formData.append("Residence", client.residence);
    formData.append("MonthlyIncome", client.monthlyIncome);
    formData.append("Balance", client.balance);
    formData.append("BankId", client.bankId);
    const { data } = await http.post<FormData>(CLIENT, formData);
    console.log(data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      http.handleError(serverError);
    }
  }
};
export const fetchClient = async (clientId: string) => {
  try {
    const { data } = await http.get<Client>(
      BASE_URL + "Clients" + "/" + clientId
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      http.handleError(serverError);
    }
  }
};
export const withdrawCash = async (
  pinCode: string,
  moneyAmount: number,
  clientId: string
) => {
  try {
    const formData = new FormData();
    formData.append("Pin", pinCode);
    formData.append("TotalSum", moneyAmount.toString());
    const { data } = await http.post<FormData>(
      BASE_URL + "Clients" + "/" + clientId + "/SubstractBalance",
      formData
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      http.handleError(serverError);
    }
  }
};
export const appendCash = async (
  pinCode: string,
  moneyAmount: number,
  clientId: string
) => {
  try {
    const formData = new FormData();
    formData.append("Pin", pinCode);
    formData.append("TotalSum", moneyAmount.toString());
    const { data } = await http.post<FormData>(
      BASE_URL + "Clients" + "/" + clientId + "/AppendBalance",
      formData
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      http.handleError(serverError);
    }
  }
};
