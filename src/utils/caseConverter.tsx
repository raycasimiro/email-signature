function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

export function plainCssToReact(css: string): string {
  // Split the input string into individual CSS properties
  const properties = css.split(";");

  // Map over each property and convert it to camelCase
  const camelCaseProperties = properties.map((property) => {
    const [key, value] = property.split(":");
    if (!key || !value) return ""; // Skip empty or invalid properties
    const camelCaseKey = kebabToCamelCase(key.trim());
    return `${camelCaseKey}: ${value.trim()}`;
  });

  // Join the converted properties back into a single string
  return camelCaseProperties.filter(Boolean).join("; ");
}
