import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { ServerError } from "../apiService/errorHandler/ErrorResponse";
import { http } from "../apiService/useAxios";
import { BASE_URL, CLIENT } from "../Utils/ApiRoutes";

export type CreationClientType = {
  name: string,
  passport: string,
  birthDate: string,
  phone: string,
  email: string,
  residence: string,
  monthlyIncome: string,
  balance: string,
  bankId: string
}

export type Client = {
  id: string,
  name: string,
  passport: string,
  birthDate: string,
  phone: string,
  email: string,
  residence: string,
  monthlyIncome: number,
  balance: number,
  depositAccounts: [],
  creditAccounts: []
}

export const fetchBankClients = async(id:string | undefined):Promise<any> =>{
  try
  {
    const { data } = await http.get<Client[]>(BASE_URL + id + CLIENT);
    console.log(data);
    
    return data;
  }catch(error){
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
        http.handleError(serverError);
    }
  }
}
export const postBankClient = async(client:CreationClientType):Promise<any> =>{
  try{
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
    const { data } = await http.post<FormData>(CLIENT,formData)
    console.log(data);
    
    return data;
  }catch(error)
  {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
        http.handleError(serverError)
    }
  }
}