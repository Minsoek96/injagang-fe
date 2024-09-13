export const fields = (obj: { [key: string]: string }): boolean =>
  Object.values(obj).some((value) => value.length === 0);

export const fieldKey = (obj: { [key: string]: string }) =>
  Object.keys(obj).find((key) => obj[key] === '');
