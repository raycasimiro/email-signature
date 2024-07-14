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
  onValidationStatusChange: (isValid: boolean) => void; // Add this line
  initialValues?: FormValues;
};

type FormValues = {
  [key: string]: string;
};

const urlSchema = z.string().refine(
  (url) => {
    // Regex to validate URLs that start with "www" and do not contain "http" or "https"
    const urlPattern = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return (
      urlPattern.test(url) &&
      !url.includes("http://") &&
      !url.includes("https://")
    );
  },
  {
    message: "Invalid URL. Must start with www followed by a valid domain.",
  }
);

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  website: urlSchema,
  // Add more validation rules based on your form fields
});

const DynamicForm: React.FC<FormProps> = ({
  fields,
  onFieldChange,
  onValidationStatusChange, // Add this line
  initialValues = {},
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid }, // Add isValid
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
    onValidationStatusChange(isValid); // Call the parent callback with the validation status
  }, [isValid, onValidationStatusChange]); // Run this effect whenever isValid changes

  const handleChange = (id: string, value: string) => {
    onFieldChange(id, value);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const toSentenceCase = (input: string): string => {
    const regularString = input.replace(/-/g, " ");
    const sentenceCaseString =
      regularString.charAt(0).toUpperCase() +
      regularString.slice(1).toLowerCase();
    return sentenceCaseString;
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-lg">Signature details</h2>
      {fields.map((field) => (
        <div key={field.id} className="text-left flex flex-col gap-2">
          <Label htmlFor={field.id}>{toSentenceCase(field.id)}</Label>
          <Controller
            name={field.id}
            control={control}
            defaultValue={initialValues[field.id] || ""}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <>
                <Input
                  className="bg-white text-black border-white"
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
                  placeholder={field.placeholder}
                />
                {errors[field.id] && (
                  <div className="box arrow-top-left">
                    <span className="text-white text-xs">
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
