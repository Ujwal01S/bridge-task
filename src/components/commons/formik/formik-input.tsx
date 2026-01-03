import { type HTMLInputTypeAttribute } from "react";
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
  type?: HTMLInputTypeAttribute;
  variant?: "default" | "formGroup" | "single";
  disabled?: boolean;
}

const FormikInput = <TValues extends FormikValues>({
  name,
  placeholder,
  className,
  isRequired = true,
  label,
  type = "text",
  variant,
  disabled,
  ...props
}: Props<TValues>) => {
  const { errors, touched, setFieldValue } = useFormikContext<TValues>();

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

          <Input
            id={name}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              if (type === "number") {
                setFieldValue(name, value === "" ? null : Number(value));
              } else {
                field.onChange(e);
              }
            }}
            {...props}
            className={cn(error && "border-red-500")}
          />

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

export default FormikInput;
