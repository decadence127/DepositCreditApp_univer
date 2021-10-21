import axios, { AxiosError } from "axios";
import { ServerError } from "../apiService/errorHandler/ErrorResponse";
import { http } from "../apiService/useAxios";
import { BANK } from "../Utils/ApiRoutes";
import { AccountChart } from "./accountChart";

export type BankCreationType = {
  BankTitle: string;
  Balance: number;

}

export type Bank = {
    id: string,
    bankTitle: string, 
    balance: number,
    accountCharts: Array<AccountChart>
}

export const fetchBanks = async():Promise<any> =>{
  try{

    const { data } = await http.get<Bank[]>(BANK);
    return data;
  }catch(error){
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
        http.handleError(serverError)
    }
  }
}

export const createBank = async(body: BankCreationType):Promise<any> =>
{
  try{
    const formData = new FormData();
    formData.append('BankTitle', body.BankTitle)
    formData.append('Balance', body.Balance.toString())
    const { data } = await http.post<FormData>(BANK, formData);
  
  return data;
  }catch(error){
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
        http.handleError(serverError)
    }
  }


}