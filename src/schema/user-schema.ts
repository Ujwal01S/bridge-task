import { z } from "zod";
import { formErrorMessage } from "@/constants/formError-message.constant";

export const userFormSchema = z.discriminatedUnion("form_type", [
  z.object({
    form_type: z.literal("create"),
    firstName: z
      .string(formErrorMessage.FIRST_NAME)
      .min(3, formErrorMessage.FIRST_NAME),
    lastName: z
      .string(formErrorMessage.LAST_NAME)
      .min(3, formErrorMessage.LAST_NAME),
    email: z.string(formErrorMessage.EMAIL).email(formErrorMessage.EMAIL),
    age: z
      .number({
        message: formErrorMessage.AGE,
      })
      .int(formErrorMessage.AGE)
      .min(18, formErrorMessage.AGE)
      .optional()
      .nullable(),
    address: z.string().optional().nullable(),
  }),

  z.object({
    form_type: z.literal("update"),
    firstName: z
      .string(formErrorMessage.FIRST_NAME)
      .min(3, formErrorMessage.FIRST_NAME),
    lastName: z
      .string(formErrorMessage.LAST_NAME)
      .min(3, formErrorMessage.LAST_NAME),
    email: z.string(formErrorMessage.EMAIL).email(formErrorMessage.EMAIL),
    age: z
      .number({
        message: formErrorMessage.AGE,
      })
      .int(formErrorMessage.AGE)
      .min(18, formErrorMessage.AGE)
      .optional()
      .nullable(),
    address: z.string().optional().nullable(),
  }),
]);

export type UserFormSchemaType = z.infer<typeof userFormSchema>;

export type UserFormPayloadType = Omit<UserFormSchemaType, "form_type">;
