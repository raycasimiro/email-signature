import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

type InputObject = {
  id: string;
  class: string;
  placeholder?: string;
};

type FormProps = {
  fields: InputObject[];
  onFieldChange: (id: string, value: string) => void;
  initialValues?: FormValues; // Add this line
};

type FormValues = {
  [key: string]: string;
};

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  // Add more validation rules based on your form fields
});

const DynamicForm: React.FC<FormProps> = ({
  fields,
  onFieldChange,
  initialValues = {}, // Add this line
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: initialValues, // Set initial values here
  });

  useEffect(() => {
    fields.forEach((field) => {
      setValue(field.id, initialValues[field.id] || "");
    });
  }, [fields, setValue, initialValues]);

  const handleChange = (id: string, value: string) => {
    onFieldChange(id, value);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const toSentenceCase = (input: string): string => {
    // Convert kebab-case to regular string
    const regularString = input.replace(/-/g, " ");

    // Convert to sentence case
    const sentenceCaseString =
      regularString.charAt(0).toUpperCase() +
      regularString.slice(1).toLowerCase();

    return sentenceCaseString;
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <div key={field.id} className="text-left flex flex-col gap-2">
          <Label htmlFor={field.id}>{toSentenceCase(field.id)}</Label>
          <Controller
            name={field.id}
            control={control}
            defaultValue={initialValues[field.id] || ""} // Set default value here
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <>
                <Input
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
                  placeholder={field.placeholder} // Optional: Set placeholder
                />
                {errors[field.id] && (
                  <span className="text-red-600 text-sm">
                    {errors[field.id]?.message}
                  </span>
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
