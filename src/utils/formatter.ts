export const formatJSONContent = (content: string) => {
  try {
    return JSON.stringify(JSON.parse(content), null, 4);
  } catch {
    return content;
  }
};
