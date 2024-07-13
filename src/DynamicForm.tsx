import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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
  onBlurCallback: (data: FormValues) => void;
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
  onBlurCallback,
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [formData, setFormData] = useState<FormValues>({});

  useEffect(() => {
    fields.forEach((field) => {
      setValue(field.id, formData[field.id] || "");
    });
  }, [fields, setValue, formData]);

  const handleChange = (id: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [id]: value }));
    onFieldChange(id, value);
  };

  const handleBlur = () => {
    const currentValues = getValues();
    onBlurCallback(currentValues);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <div key={field.id} className="text-left">
          <Label htmlFor={field.id}>{field.id}</Label>
          <Controller
            name={field.id}
            control={control}
            defaultValue={formData[field.id] || ""}
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
                    handleBlur();
                  }}
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
