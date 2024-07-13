type IdClassObject = {
  id: string;
  class: string;
};

const extractIdAndClass = (htmlString: string): IdClassObject[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const elements = doc.querySelectorAll("*[id][class]"); // Select elements with both id and class

  const result: IdClassObject[] = [];

  elements.forEach((element) => {
    const id = element.getAttribute("id");
    const className = element.getAttribute("class");

    if (id && className) {
      result.push({ id, class: className });
    }
  });

  return result;
};

export default extractIdAndClass;
