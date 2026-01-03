import FormikInput from "@/components/commons/formik/formik-input";
import FormikPasswordInput from "@/components/commons/formik/formik-password-input";
import { Button } from "@/components/ui/button";
import { Form, Formik, type FormikHelpers } from "formik";
import { Spinner } from "../../ui/spinner";
import { z } from "zod";
import { loginSchema } from "@/schema/login-schema";
import { useLogin } from "@/api/hooks/auth/use-login";

type LoginFormType = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const defaultValues: LoginFormType = {
    username: "emilys",
    password: "emilyspass",
  };

  const { login, loginIsPending } = useLogin();

  const validate = (values: LoginFormType) => {
    const result = loginSchema.safeParse(values);

    if (result.success) return {};

    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!errors[path]) errors[path] = issue.message;
    }
    return errors;
  };

  const handleSubmit = async (
    values: LoginFormType,
    { resetForm }: FormikHelpers<LoginFormType>
  ) => {
    login(values);
  };

  return (
    <div className='flex items-center w-[40vw] justify-center min-h-screen'>
      <div className='w-full p-8 space-y-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-center'>Login</h2>

        <Formik<LoginFormType>
          initialValues={defaultValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='grid gap-4'>
              <FormikInput<LoginFormType>
                name='username'
                label='Username'
                placeholder='Enter username'
                variant='single'
              />

              <FormikPasswordInput<LoginFormType>
                name='password'
                label='Password'
                placeholder='Enter password'
                variant='single'
              />

              <Button type='submit' disabled={isSubmitting || loginIsPending}>
                {isSubmitting || loginIsPending ? (
                  <div className='flex gap-2 items-center'>
                    <Spinner /> Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
