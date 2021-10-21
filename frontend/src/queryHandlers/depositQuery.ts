import axios, { AxiosError } from "axios";
import { dateFormatter } from "../Utils/dateFormatter";
import { ServerError } from "../apiService/errorHandler/ErrorResponse";
import { http } from "../apiService/useAxios";
import { CLIENT } from "../Utils/ApiRoutes";

export type Deposit = {
  accountChartId: string;
  depositBalance: string;
  activeBefore: string;
};

export const postDeposit = async (
  body: Deposit,
  clientId: string
): Promise<any> => {
  const formattedDate: string = dateFormatter(body.activeBefore);
  try {
    const formData = new FormData();
    formData.append("AccountChartId", body.accountChartId);
    formData.append("DepositBalance", body.depositBalance);
    formData.append("ActiveBefore", formattedDate);
    const { data } = await http.post<FormData>(
      CLIENT + "/" + clientId + "/Deposits",
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
