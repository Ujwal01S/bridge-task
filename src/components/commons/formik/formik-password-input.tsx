import { useState } from "react";
import {
  Field,
  type FieldProps,
  type FormikValues,
  getIn,
  useFormikContext,
} from "formik";
import { Input } from "@/components/ui/input";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const inputFieldVariants = cva("form-group", {
  variants: {
    variant: {
      default: "w-full",
      formGroup: "lg:w-[calc(50%-10px)] w-full",
      single: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props<TValues extends FormikValues> {
  name: string;
  className?: string;
  isRequired?: boolean;
  placeholder: string;
  label?: string;
  variant?: "default" | "formGroup" | "single";
  disabled?: boolean;
}

const FormikPasswordInput = <TValues extends FormikValues>({
  name,
  placeholder,
  className,
  isRequired = true,
  label,
  variant,
  disabled,
  ...props
}: Props<TValues>) => {
  const { errors, touched } = useFormikContext<TValues>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isTouched = Boolean(getIn(touched, name));
  const error = isTouched ? getIn(errors, name) : undefined;

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <div className={cn(inputFieldVariants({ variant, className }))}>
          {label && (
            <label
              htmlFor={name}
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {label} {isRequired && <span className='text-red-500'>*</span>}
            </label>
          )}

          <div className='relative'>
            {showPassword ? (
              <Eye
                size={14}
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-[35%] cursor-pointer'
              />
            ) : (
              <EyeOff
                size={14}
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-[35%] cursor-pointer'
              />
            )}
            <Input
              id={name}
              placeholder={placeholder}
              type={showPassword ? "text" : "password"}
              disabled={disabled}
              {...field}
              {...props}
              className={cn(error && "border-red-500")}
            />
          </div>

          {error && (
            <p className='text-sm font-medium text-destructive'>
              {String(error)}
            </p>
          )}
        </div>
      )}
    </Field>
  );
};

export default FormikPasswordInput;
