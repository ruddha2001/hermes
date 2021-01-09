import { template } from "dot";

export const getParsedString = (dynamicString: string, data: any) => {
  const renderFunction = template(dynamicString);
  const parsedString = renderFunction(data);
  return parsedString;
};
