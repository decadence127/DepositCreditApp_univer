import { http } from "../apiService/useAxios";

// export type AccountChart = {
//   id: string,
//   accountType: number,
//   chartName: string,
//   accountingPercent: number,
//   usePercentInRecharging: boolean
// };
export type AccountChart = { // mock data type
  userId: number,
  id: number,
  title: string
}

export const fetchAccountCharts = async ():Promise<AccountChart[]> =>{ // function returns Promise of AccountChart[] type 
    const {data} = await http.get<AccountChart[]>("/posts");
  
    return data;


}