import { http } from "../apiService/useAxios";
import { BASE_URL } from "../Utils/ApiRoutes";



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

export const fetchBankClients = async(id:string | undefined):Promise<Client[]> =>{
  
  const { data } = await http.get<Client[]>(BASE_URL + id +"/Clients");
  console.log(data);
  
  return data;
}