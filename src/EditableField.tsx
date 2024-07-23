type StyleObject = { [key: string]: string | number };

interface EditableFieldProps {
  id: string;
  type: string;
  style?: StyleObject;
  value: string;
}

const EditableField = ({ id, type, style, value }: EditableFieldProps) => {
  const renderField = () => {
    switch (type) {
      case "email":
        return (
          <a
            href={`mailto:${value}`}
            id={id}
            style={style}
            className={type}
            target="_blank"
          >
            {value}
          </a>
        );
      case "url":
        return (
          <a
            href={`https://${value}`}
            id={id}
            style={style}
            className={type}
            target="_blank"
          >
            {value}
          </a>
        );

      case "phone":
        return (
          <a
            href={`tel:${value}`}
            id={id}
            style={style}
            className={type}
            target="_blank"
          >
            {value}
          </a>
        );
      default:
        return (
          <span id={id} style={style} className={type}>
            {value}
          </span>
        );
    }
  };

  return renderField();
};

export default EditableField;
