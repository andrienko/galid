export const parseJson = <T>(data?: string): T | undefined => {
  if (!data) {
    return undefined;
  }
  try {
    const parsed = JSON.parse(data);
    if (parsed) {
      return parsed as T;
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

export const formatJson = <T>(data: T): string | undefined => {
  try {
    return JSON.stringify(data, null, 2);
  } catch (e) {
    console.error(e);
  }
  return undefined;
};
