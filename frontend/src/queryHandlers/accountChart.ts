import { http } from "../apiService/useAxios";
import { ACCOUNT_CHARTS } from "../Utils/ApiRoutes";


export type AccountChart = {
  id: string,
  accountType: number,
  chartName: string,
  accountingPercent: number,
  usePercentInRecharging: boolean
};

export const fetchAccountCharts = async ():Promise<AccountChart[]> =>{ // function returns Promise of AccountChart[] type 
    const {data} = await http.get<AccountChart[]>(ACCOUNT_CHARTS);
  
    return data;


}