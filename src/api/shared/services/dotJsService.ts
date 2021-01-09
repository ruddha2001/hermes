import { template } from "dot";

export const getParsedString = (dynamicString: string, data: any) => {
  const renderFunction = template(dynamicString, data);
  const parsedString = renderFunction();
  return parsedString;
};
