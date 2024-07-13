import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type InputObject = {
  id: string;
  class: string;
};

type FormProps = {
  fields: InputObject[];
  onFieldChange: (id: string, value: string) => void;
};

type FormValues = {
  [key: string]: string;
};

const DynamicForm: React.FC<FormProps> = ({ fields, onFieldChange }) => {
  const { control, setValue } = useForm<FormValues>();
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

  return (
    <form>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.id}</label>
          <Controller
            name={field.id}
            control={control}
            defaultValue={formData[field.id] || ""}
            render={({ field: { onChange, value, onBlur, ...fieldProps } }) => (
              <input
                id={field.id}
                {...fieldProps}
                type={field.class}
                value={value}
                onChange={(e) => {
                  onChange(e);
                  handleChange(field.id, e.target.value);
                }}
                onBlur={onBlur}
              />
            )}
          />
        </div>
      ))}
    </form>
  );
};

export default DynamicForm;
