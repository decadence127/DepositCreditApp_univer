import axios, { AxiosError } from "axios";
import { dateFormatter } from "../Utils/dateFormatter";
import { ServerError } from "../apiService/errorHandler/ErrorResponse";
import { http } from "../apiService/useAxios";
import { CLIENT } from "../Utils/ApiRoutes";

export type Credit = {
  accountChartId: string;
  creditBalance: string;
  activeBefore: string;
};

export const postCredit = async (
  body: Credit,
  clientId: string
): Promise<any> => {
  const formattedDate: string = dateFormatter(body.activeBefore);
  try {
    const formData = new FormData();

    formData.append("AccountChartId", body.accountChartId);
    formData.append("CreditBalance", body.creditBalance);
    formData.append("ActiveBefore", formattedDate);
    const { data } = await http.post<FormData>(
      CLIENT + "/" + clientId + "/Credits",
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
export const payCreditDebt = async (
  creditId: string,
  clientId: string,
  payment: number
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("Payment", payment.toString());
    const { data } = await http.post<FormData>(
      CLIENT + "/" + clientId + "/Credits/" + creditId + "/Pay",
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
export const rechargeCredit = async (
  creditId: string,
  clientId: string
): Promise<any> => {
  try {
    const { data } = await http.post<FormData>(
      CLIENT + "/" + clientId + "/Credits/" + creditId + "/Recharge"
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      http.handleError(serverError);
    }
  }
};
