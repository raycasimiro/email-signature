import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { toSentenceCase } from "./utils/convertCase";

type InputObject = {
  id: string;
  class: string;
};

type FormProps = {
  fields: InputObject[];
  onFieldChange: (id: string, value: string) => void;
  onValidationStatusChange: (isValid: boolean) => void;
  initialValues?: FormValues;
};

type FormValues = {
  [key: string]: string;
};

// Custom URL validation schema
const urlSchema = z.string().refine(
  (url) => {
    // Regex to validate a valid domain name, optionally starting with http://, https://, or www.
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return urlPattern.test(url);
  },
  {
    message: "Invalid URL",
  }
);

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  "primary-phone": z.string().min(1, "Phone is required"),
  website: urlSchema,
  // Add more validation rules based on your form fields
});

const DynamicForm = ({
  fields,
  onFieldChange,
  onValidationStatusChange,
  initialValues = {},
}: FormProps) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  useEffect(() => {
    fields.forEach((field) => {
      setValue(field.id, initialValues[field.id] || "");
    });
  }, [fields, setValue, initialValues]);

  useEffect(() => {
    onValidationStatusChange(isValid);
  }, [isValid, onValidationStatusChange]);

  const handleChange = (id: string, value: string) => {
    onFieldChange(id, value);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <div key={field.id} className="text-left flex flex-col gap-2">
          <Label htmlFor={field.id}>
            <span className="font-inter">{toSentenceCase(field.id)}</span>
          </Label>
          <Controller
            name={field.id}
            control={control}
            defaultValue={initialValues[field.id] || ""}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <>
                <Input
                  className="bg-white text-black border-white font-inter"
                  id={field.id}
                  ref={ref}
                  type={field.class}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    handleChange(field.id, e.target.value);
                  }}
                  onBlur={(e) => {
                    onBlur();
                    handleChange(field.id, e.target.value);
                  }}
                />
                {errors[field.id] && (
                  <div className="box arrow-top-left">
                    <span className="text-white text-xs font-inter">
                      {errors[field.id]?.message}
                    </span>
                  </div>
                )}
              </>
            )}
          />
        </div>
      ))}
    </form>
  );
};

export default DynamicForm;
