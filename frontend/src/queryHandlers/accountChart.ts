import axios, { AxiosError } from "axios";
import { ServerError } from "../apiService/errorHandler/ErrorResponse";
import { http } from "../apiService/useAxios";
import { ACCOUNT_CHARTS } from "../Utils/ApiRoutes";


export type AccountChart = {
  id: string,
  accountType: number,
  chartName: string,
  accountingPercent: number,
  usePercentInRecharging: boolean
};

export const fetchAccountCharts = async ():Promise<any> =>{ // function returns Promise of AccountChart[] type 
  try{
    const {data} = await http.get<AccountChart[]>(ACCOUNT_CHARTS);
  
    return data;
  }catch(error){
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
        http.handleError(serverError)
    }
  }


}