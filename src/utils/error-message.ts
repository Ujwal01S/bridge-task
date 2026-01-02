import type { IError } from "@/interface/response/error-response.interface";
import type { AxiosError } from "axios";

// extend error message to get single string error message
export const getErrorMessage = (error: AxiosError<IError>): string => {
  return (
    error.response?.data.message || error.message || "Something went wrong"
  );
};
