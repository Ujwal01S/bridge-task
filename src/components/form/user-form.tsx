import { Form, Formik } from "formik";
import FormikInput from "@/components/commons/formik/formik-input";
import { Button } from "@/components/ui/button";
import {
  userFormSchema,
  type UserFormPayloadType,
  type UserFormSchemaType,
} from "@/schema/user-schema";

interface Props {
  mode: "create" | "update";
  initialValues?: Partial<UserFormPayloadType>;
  onSubmit: (values: UserFormPayloadType) => void | Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
}

const UserForm = ({
  mode,
  initialValues,
  onSubmit,
  submitLabel,
  isLoading = false,
}: Props) => {
  const defaultValues: UserFormSchemaType = {
    form_type: mode,
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    email: initialValues?.email || "",
    age: initialValues?.age ?? null,
    address: initialValues?.address ?? "",
  };

  const validate = (values: UserFormSchemaType) => {
    const result = userFormSchema.safeParse(values);

    if (result.success) return {};

    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!errors[path]) errors[path] = issue.message;
    }
    return errors;
  };

  const handleSubmit = async (values: UserFormSchemaType) => {
    const result = userFormSchema.safeParse(values);

    if (!result.success) {
      return;
    }

    const { form_type, ...payload } = result.data;
    await onSubmit(payload);
  };

  return (
    <Formik<UserFormSchemaType>
      initialValues={defaultValues}
      enableReinitialize={true}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='grid gap-4'>
          <div className='flex flex-wrap gap-4'>
            <FormikInput<UserFormSchemaType>
              name='firstName'
              label='First Name'
              placeholder='Enter first name'
              variant='formGroup'
            />

            <FormikInput<UserFormSchemaType>
              name='lastName'
              label='Last Name'
              placeholder='Enter last name'
              variant='formGroup'
            />

            <FormikInput<UserFormSchemaType>
              name='email'
              label='Email'
              placeholder='Enter email'
              type='email'
              variant='formGroup'
            />

            <FormikInput<UserFormSchemaType>
              name='age'
              label='Age'
              placeholder='Enter age'
              type='number'
              isRequired={false}
              variant='formGroup'
            />

            <FormikInput<UserFormSchemaType>
              name='address'
              label='Address'
              placeholder='Enter address'
              isRequired={false}
              variant='formGroup'
            />
          </div>

          <Button type='submit' disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading
              ? "Submitting..."
              : submitLabel ||
                (mode === "create" ? "Create User" : "Update User")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
