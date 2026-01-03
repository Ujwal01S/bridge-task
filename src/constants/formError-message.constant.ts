import type { IFormErrorMessage } from "@/interface";

export const formErrorMessage: IFormErrorMessage = {
  EMAIL: "Email is required",
  FIRST_NAME: "Frist Name is required and must be atleast 3 characters",
  LAST_NAME: "Last name is required and must be atleast 3 characters",
  AGE: "Age must be above 18 or equal",
};
