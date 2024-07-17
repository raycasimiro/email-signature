export const toSentenceCase = (input: string): string => {
  const regularString = input.replace(/-/g, " ");
  const sentenceCaseString =
    regularString.charAt(0).toUpperCase() +
    regularString.slice(1).toLowerCase();
  return sentenceCaseString;
};
