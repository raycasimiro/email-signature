import React, { useState } from "react";

interface EditableFieldProps {
  placeholder: string;
  style?: React.CSSProperties;
}

const EditableField = ({ placeholder, style }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(placeholder);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
          style={style}
        />
      ) : (
        <span onClick={handleTextClick} style={style}>
          {text}
        </span>
      )}
    </>
  );
};

export default EditableField;
