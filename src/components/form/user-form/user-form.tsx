import { useCreateUser } from "@/api/hooks/user/use-create-user";
import { useUpdateUser } from "@/api/hooks/user/use-update-user";
import SubmitButton from "@/components/commons/custom-button/submit-button";
import FormikInput from "@/components/commons/formik/formik-input";
import { Button } from "@/components/ui/button";
import type { IPickedUser } from "@/interface";
import { userFormSchema, type UserFormSchemaType } from "@/schema/user-schema";
import { useModalStore } from "@/store/use-modal-store";
import { Form, Formik, type FormikHelpers } from "formik";

interface Props {
  mode: "create" | "update";
  initialValues?: IPickedUser;
  submitLabel?: string;
  id?: number;
}

const UserForm = ({ mode, initialValues, submitLabel, id }: Props) => {
  const defaultValues: UserFormSchemaType = {
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    email: initialValues?.email || "",
    age: initialValues?.age ?? undefined,
  };
  // edit user mutation custom hook
  const { editUser, userEditIsPending } = useUpdateUser();

  // create user mutation custom hook
  const { createUser, createUserIsPending } = useCreateUser();

  // for close modal
  const { closeModal } = useModalStore();

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

  const handleSubmit = async (
    values: UserFormSchemaType,
    { resetForm }: FormikHelpers<UserFormSchemaType>
  ) => {
    const { age, ...payload } = values;

    const formattedPayload = {
      ...payload,
      ...(age !== null && age !== undefined && { age }),
    };

    if (mode === "update" && id !== undefined) {
      editUser({ id, payload: formattedPayload });
    }

    if (mode === "create") {
      createUser(formattedPayload, {
        onSuccess: () => {
          resetForm();
        },
      });
    }
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
          </div>

          <div className='w-full flex gap-3 items-center '>
            <Button
              variant={"outline"}
              type='button'
              onClick={() => closeModal()}
              className='flex-1'
              disabled={
                isSubmitting || userEditIsPending || createUserIsPending
              }
            >
              Cancel
            </Button>
            <SubmitButton
              disabled={
                isSubmitting || userEditIsPending || createUserIsPending
              }
              mode={mode}
              submitLabel={submitLabel}
              className='flex-1'
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
