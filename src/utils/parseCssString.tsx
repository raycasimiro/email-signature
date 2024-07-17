// Import necessary TypeScript and React types
type StyleObject = { [key: string]: string | number };

const parseCssString = (css: string): StyleObject => {
  const style: StyleObject = {};
  const cssArray = css.split(";").filter(Boolean);

  cssArray.forEach((cssRule) => {
    const [property, value] = cssRule.split(":").map((str) => str.trim());
    if (property && value) {
      // Convert kebab-case to camelCase
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase()
      );
      style[camelCaseProperty] = value;
    }
  });

  return style;
};

export default parseCssString;
